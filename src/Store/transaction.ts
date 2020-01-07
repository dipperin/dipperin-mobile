import BN from 'bignumber.js'
import { isString } from 'lodash'
import { computed, observable, runInAction, action } from 'mobx'

import { getTx, insertTx, updateTx } from 'Db'
import {
  DEFAULT_CHAIN_ID,
  DEFAULT_HASH_LOCK,
  TRANSACTION_STATUS_FAIL,
  TRANSACTION_STATUS_SUCCESS,
  CHAIN_ID_DIC
} from 'Global/constants'
import { Utils } from '@dipperin/dipperin.js'

import TransactionModel, { TransactionInterface } from 'Models/transaction'
import { getNowTimestamp } from 'Global/utils'
import Errors from 'Global/errors'
import RootStore from './root'

class TransactionStore {
  private _store: RootStore

  @observable
  private _transactionsMap: Map<string, TransactionModel[]> // key is address

  constructor(store: RootStore) {
    this._store = store
    this._transactionsMap = new Map()
  }

  @computed
  get transactions(): TransactionModel[] {
    return (this._transactionsMap.get(this._store.account.activeAccount!.address) || []).slice().reverse()
  }

  @computed
  get transactionsMap() {
    return this._transactionsMap
  }

  startUpdate() {
    this._store.timer.on('update_transactions', this.updateTransactionType.bind(this), 5000)
  }

  updateTransactionType() {
    for (const transactions of this._transactionsMap.values()) {
      transactions
        .filter(tx => !tx.isSuccess && !tx.isOverLongTime(getNowTimestamp()))
        .forEach(tx => {
          const txs = transactions
          this._store.dipperin!.dr
            .getTransaction(tx.transactionHash!)
            .then(res => {
              if (!res.transaction) {
                if (tx.isOverTime(getNowTimestamp()) || this.haveSameNonceSuccessTx(tx, txs)) {
                  tx.setFail()
                  updateTx(tx.transactionHash!, { status: TRANSACTION_STATUS_FAIL }, this._store.chainData.currentNet)
                  // updata account nonce when transition failed
                  this._store.account.updateAccountsNonce(this._store.account.activeAccount!.id)
                }
                return
              } else {
                tx.setSuccess()
                updateTx(tx.transactionHash!, { status: TRANSACTION_STATUS_SUCCESS }, this._store.chainData.currentNet)
              }
            })
            .catch(err => console.error(err))
        })
    }
  }

  @action
  appendTransaction(address: string, txs: TransactionInterface[]) {
    const mTxs = txs.map(tx => {
      return new TransactionModel({
        ...tx,
        hashLock: '',
        status: tx.status ? tx.status : TRANSACTION_STATUS_SUCCESS
      })
    })

    const preTxs = this._transactionsMap.get(address) || []

    const newTxs = [...preTxs, ...mTxs].sort((tx1, tx2) => tx1.timestamp! - tx2.timestamp!)

    this.transactionsMap.set(address, newTxs)

    mTxs.forEach(tx => insertTx(tx.toJS(), this._store.chainData.currentNet))
  }

  getTransactionFee(address: string, amount: string, memo: string): string {
    try {
      const transaction = this.createNewTransaction(address, amount, memo)
      return transaction.fee
    } catch (err) {
      return '0'
    }
  }

  getSignedTransactionData(
    address: string,
    amount: string,
    memo: string,
    gas?: string,
    gasPrice?: string
  ): TransactionModel {
    console.log(this._store.account.activeAccount!.path, 'aaaa')
    const privateKey = this._store.wallet.getPrivateKeyByPath(this._store.account.activeAccount!.path)
    console.log(privateKey, 'pppppppppppppp')
    const transaction = this.createNewTransaction(address, amount, memo, gas, gasPrice)
    const net = this._store.chainData.currentNet
    const chainId = net in CHAIN_ID_DIC ? CHAIN_ID_DIC[net] : DEFAULT_CHAIN_ID
    transaction.signTranaction(privateKey, chainId)
    return transaction
  }

  getChainId = (): string => {
    const net = this._store.chainData.currentNet
    const chainId: string = net in CHAIN_ID_DIC ? CHAIN_ID_DIC[net] : DEFAULT_CHAIN_ID
    return chainId
  }

  async confirmTransaction(
    address: string,
    amount: string,
    memo: string,
    gas?: string,
    gasPrice?: string
  ): Promise<TxResponse> {
    try {
      const transaction = this.getSignedTransactionData(address, amount, memo, gas, gasPrice)
      // const privateKey = this._store.wallet.getPrivateKeyByPath(this._store.account.activeAccount.path)
      // const transaction = this.createNewTransaction(address, amount, memo, gas, gasPrice)
      // transaction.signTranaction(privateKey, DEFAULT_CHAIN_ID)
      const res = await this._store.dipperin!.dr.sendSignedTransaction(transaction.signedTransactionData!)
      // console.log(transaction.transactionHash)
      if (!isString(res)) {
        const errRes = res
        return {
          success: false,
          info: errRes.error ? errRes.error.message : 'Something wrong!'
        }
      }
      if (res === transaction.transactionHash) {
        // Append Transaction
        const activeAccountAddress = this._store.account.activeAccount!.address
        this.appendTransaction(activeAccountAddress, [transaction.toJS()])
        // Plus account nonce
        this._store.account.activeAccount!.plusNonce()
        return {
          success: true,
          info: transaction.transactionHash
        }
      } else {
        return {
          success: false,
          info: 'Something wrong!'
        }
      }
    } catch (err) {
      console.log(String(err))
      if (err instanceof Errors.NoEnoughBalanceError) {
        return {
          success: false,
          info: err.message
        }
      }
      return {
        success: false,
        info: String(err)
      }
    }
  }

  async estimateGas(
    address: string,
    amount: string,
    memo: string,
    gas?: string,
    gasPrice?: string
  ): Promise<TxResponse> {
    // const privateKey = this._store.wallet.getPrivateKeyByPath(this._store.account.activeAccount.path)
    const transaction = this.getSignedTransactionData(address, amount, memo, gas, gasPrice)

    try {
      // const transaction = this.createNewTransaction(address, amount, memo, gas, gasPrice)
      // transaction.signTranaction(privateKey, DEFAULT_CHAIN_ID)
      const res = await this._store.dipperin!.dr.estimateGas(transaction.signedTransactionData!)
      console.log('estimate running', { res })
      return {
        success: true,
        info: Number(res).toString()
      }
    } catch (err) {
      if (err instanceof Errors.NoEnoughBalanceError) {
        return {
          success: false,
          info: err.message
        }
      }
      return {
        success: false,
        info: String(err)
      }
    }
  }

  async load() {
    await Promise.all(
      this._store.account.accounts.map(async account => {
        const txs = await getTx(account.address, this._store.chainData.currentNet)
        try {
          runInAction(() => {
            this._transactionsMap.set(
              account.address,
              txs.map(
                tx =>
                  new TransactionModel({
                    extraData: tx.extraData,
                    fee: tx.fee,
                    from: tx.from,
                    hashLock: tx.hashLock,
                    nonce: tx.nonce,
                    status: tx.status,
                    timeLock: tx.timeLock,
                    timestamp: tx.timestamp,
                    to: tx.to,
                    transactionHash: tx.transactionHash,
                    value: tx.value
                  })
              )
            )
          })
        } catch (err) {
          console.error(err)
        }
      })
    )
  }

  clear() {
    this._transactionsMap.clear()
  }

  reload() {
    this.clear()
    this.load()
  }

  // private createNewTransaction(
  createNewTransaction(
    address: string,
    amount: string,
    memo: string,
    gas?: string,
    gasPrice?: string
  ): TransactionModel {
    const fromAccount = this._store.account.activeAccount
    const amountUnit = Utils.toUnit(amount)

    // TODO: confirm default with yc
    const gasUnit = gas ? gas : '21000'
    const gasPriceUnit = gasPrice ? gasPrice : '1'

    const accountAmount = Utils.toUnit(fromAccount!.balance)
    if (new BN(accountAmount).lt(new BN(amountUnit).plus(new BN(gasUnit).times(new BN(gasPriceUnit))))) {
      throw new Errors.NoEnoughBalanceError()
    }

    return new TransactionModel({
      nonce: fromAccount!.nonce,
      extraData: memo,
      value: amountUnit,
      hashLock: DEFAULT_HASH_LOCK,
      from: fromAccount!.address,
      to: address,
      gas: gasUnit,
      gasPrice: gasPriceUnit
    })
  }

  createTransaction(
    fromAddress: string,
    toAddress: string,
    valueUnit: string,
    extraData: string,
    gas: string,
    gasPrice: string,
    nonce: string,
    hashLock: string
  ) {
    return new TransactionModel({
      nonce,
      extraData,
      from: fromAddress,
      to: toAddress,
      value: valueUnit,
      gas,
      gasPrice,
      hashLock
    })
  }

  private haveSameNonceSuccessTx(tx: TransactionModel, txs: TransactionModel[]): boolean {
    return txs
      .filter(t => t.isSuccess)
      .some(t => t.from === tx.from && t.nonce === tx.nonce && t.transactionHash !== tx.transactionHash)
  }
}

export default TransactionStore

export interface TxResponse {
  success: boolean
  info?: string
  hash?: string
}
