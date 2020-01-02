import { observable, computed, action } from 'mobx'
import { Accounts, Utils } from '@dipperin/dipperin.js'
import {
  TRANSACTION_LIMIT_TIME,
  TRANSACTION_STATUS_FAIL,
  TRANSACTION_STATUS_PENDING,
  TRANSACTION_STATUS_SUCCESS
} from '@/utils/constants'

export default class TransactionModel {
  @observable
  private _signedTransactionData: string
  @observable
  private _transactionHash: string
  @observable
  private _fee: string
  @observable
  private _gas: string
  @observable
  private _gasPrice: string
  @observable
  private _status: string
  @observable
  private _timestamp: number

  private _nonce: string
  private _value: string
  private _hashLock: string
  private _to: string
  private _from: string
  private _extraData?: string
  private _timeLock: number

  constructor(transaction: TransactionInterface) {
    const {
      nonce,
      value,
      from,
      to,
      extraData,
      timeLock,
      status,
      hashLock,
      transactionHash,
      fee,
      gas,
      gasPrice,
      timestamp
    } = transaction

    this._nonce = nonce
    this._value = value
    this._hashLock = hashLock
    this._to = to
    this._from = from
    this._extraData = extraData
    this._timeLock = timeLock || 0
    this._status = status || TRANSACTION_STATUS_PENDING

    if (transactionHash) {
      this._transactionHash = transactionHash as string
    }
    if (fee && fee !== '0') {
      this._fee = fee
    } else if ((!gas && !gasPrice) || (gas === '0' && gasPrice === '0')) {
      this._fee = Accounts.getTransactionFee({
        extraData,
        // fee: '0',
        hashLock,
        nonce,
        timeLock,
        to,
        value
      })
    } else {
      this._fee = '0'
    }

    if (gas && gasPrice) {
      this._gas = gas
      this._gasPrice = gasPrice
    }

    if (timestamp) {
      this._timestamp = timestamp
    }
  }

  get nonce() {
    return this._nonce
  }

  get value() {
    return Utils.fromUnit(this._value)
  }

  get to() {
    return this._to
  }

  get from() {
    return this._from
  }

  get hashLock() {
    return this._hashLock
  }

  get extraData() {
    return this._extraData
  }

  get timeLock() {
    return this._timeLock
  }

  @computed
  get timestamp() {
    return this._timestamp
  }

  @computed
  get signedTransactionData() {
    return this._signedTransactionData
  }

  @computed
  get transactionHash() {
    return this._transactionHash
  }

  @computed
  get fee() {
    return Utils.fromUnit(this._fee)
  }

  @computed
  get gas() {
    return this._gas
  }

  @computed
  get gasPrice() {
    return this._gasPrice
  }

  @computed
  get feeUint() {
    return this._fee
  }

  @computed
  get status() {
    return this._status
  }

  @computed
  get isEnded(): boolean {
    return this._status !== TRANSACTION_STATUS_PENDING
  }

  @computed
  get isSuccess(): boolean {
    return this._status === TRANSACTION_STATUS_SUCCESS
  }

  isOverTime(now: number): boolean {
    return now - this._timestamp > TRANSACTION_LIMIT_TIME
  }

  isOverLongTime(now: number): boolean {
    return now - this._timestamp > TRANSACTION_LIMIT_TIME * 10
  }

  @action
  setSuccess() {
    this._status = TRANSACTION_STATUS_SUCCESS
  }

  @action
  setFail() {
    this._status = TRANSACTION_STATUS_FAIL
  }

  @action
  signTranaction(privateKey: string, chainId?: string) {
    if (this._signedTransactionData) {
      return
    }
    const signedTransaction = Accounts.signTransaction(
      {
        extraData: this.extraData,
        // fee: this._fee,
        hashLock: this._hashLock,
        nonce: this._nonce,
        timeLock: this.timeLock,
        to: this._to,
        value: this._value,
        from: this._from,
        gas: this.gas,
        gasPrice: this.gasPrice
      },
      privateKey,
      chainId
    )
    this._signedTransactionData = signedTransaction.raw
    this._transactionHash = signedTransaction.hash
    this._timestamp = new Date().valueOf()
  }

  toJS() {
    return {
      extraData: this._extraData,
      fee: this._fee,
      from: this._from,
      hashLock: this._hashLock,
      nonce: this._nonce,
      status: this._status,
      timeLock: this._timeLock,
      timestamp: this._timestamp,
      to: this._to,
      transactionHash: this._transactionHash,
      value: this._value
    }
  }
}

export interface TransactionInterface {
  nonce: string
  value: string
  hashLock: string
  to: string
  from: string
  extraData?: string
  fee?: string
  gas?: string
  gasPrice?: string
  status?: string
  timeLock?: number
  timestamp?: number
  transactionHash?: string
}
