import { computed, observable, action, runInAction } from 'mobx'

import AccountModel, { AccountType, Opt } from 'Models/account'
import RootStore from './root'
import { Accounts, EncryptResult, helper } from '@dipperin/dipperin.js'

import { getAccount, insertAccount, removeAccount, updateSingleAccount } from 'Db'
import { FIRST_ACCOUNT_ID, ACCOUNTS_PATH, TRANSACTION_STATUS_SUCCESS } from 'Global/constants'
import { TxResponseCode, TxResponseInfo } from 'Global/errors'

export default class AccountStore {
  private _store: RootStore

  @observable
  private _accountMap: Map<string, AccountModel> = new Map() // The accounts array for this wallet
  @observable
  private _activeAccount?: AccountModel // Now use account

  constructor(store: RootStore) {
    this._store = store
  }

  @computed
  get accountMap() {
    return this._accountMap
  }

  @computed
  get accounts() {
    const accounts: AccountModel[] = []
    for (const account of this._accountMap.values()) {
      accounts.push(account)
    }
    return accounts
  }

  @computed
  get activeAccount() {
    return this._activeAccount
  }

  /**
   * Start to update the account data, no tests.
   */
  startUpdate() {
    this.updateAccountsBalance()
    this.updateAddressLockMoney()
    this.updateAccountsNonce()
    this._store.timer.on('update-balance', this.updateAccountsBalance.bind(this), 5000)
    this._store.timer.on('update-lockMoney', this.updateAddressLockMoney.bind(this), 5000)
    this._store.timer.on('update-nonce', this.updateAccountsNonce.bind(this), 30000)
  }

  /**
   * Init Account
   */
  @action
  initAccount = async (): Promise<void> => {
    await this.addAccount(FIRST_ACCOUNT_ID)
  }

  /**
   * Load wallet from data store
   */
  @action
  load = async () => {
    try {
      const accounts = await getAccount()
      if (accounts.length > 0) {
        accounts.forEach(account => {
          runInAction(() => {
            this._accountMap.set(
              String(account.id),
              this.newAccount(String(account.id), account.path, account.address, account.name)
            )
          })
        })
      }
      if (this._accountMap.size > 0) {
        this.changeActiveAccount(this._store.wallet.activeAccountId)
      }
    } catch (err) {
      console.error(err)
    }
  }
  @action
  removeAccountAsync = async (id: string): Promise<Error | void> => {
    try {
      this._accountMap.delete(id)
      await removeAccount(Number(id))
    } catch (err) {
      return err
    }
  }

  /**
   * Add account
   * @param index
   */
  @action
  addAccount = async (index?: string) => {
    const newIndex = index ? index : this.getSafeAccountIndex()
    const newPath = `${ACCOUNTS_PATH}/${newIndex}`
    const address = this._store.wallet.getAccountByPath(newPath).address
    // Add new account
    const newAccount = this.newAccount(newIndex, newPath, address, '')
    // Save account
    this._accountMap.set(newIndex, newAccount)
    // add to db
    await insertAccount(newAccount.toJS())
    this.changeActiveAccount(newAccount.id)
    this.updateAccountsBalance(newAccount.id)
    this.updateAccountsNonce(newAccount.id)
  }
  /**
   * Update account
   * @param account :AccountModel
   */
  @action
  updateAccount = async (account: AccountModel) => {
    await updateSingleAccount(account.toJS())
  }

  @action
  importPrivateKey = async (privateKey: string) => {
    const newIndex = this.getSafeAccountIndex()
    const address = helper.Account.fromPrivate(privateKey)
    if (this.accounts.filter(el => el.address === address).length > 0) {
      throw new Error(TxResponseInfo[TxResponseCode.addressReimportError])
    }
    // Add new account
    const newAccount = this.importAccount(newIndex, address, privateKey)
    // Save account
    this._accountMap.set(newIndex, newAccount)
    // add to db
    await insertAccount(newAccount.toJS())
    this.changeActiveAccount(newAccount.id)
    this.updateAccountsBalance(newAccount.id)
    this.updateAccountsNonce(newAccount.id)
  }

  showDbAccounts = async () => {
    console.log('show db account', await getAccount())
  }

  /**
   * Change now active account
   *
   * @param accountId new active account id
   */
  @action
  changeActiveAccount(accountId: string): void {
    const newActiveAccount = this._accountMap.get(accountId)
    if (newActiveAccount) {
      this._activeAccount = newActiveAccount
      // change wallet active accoun id
      this._store.wallet.activeAccountId = this.activeAccount!.id
      // update tx & contract
      this._store.transaction.reload()
    }
  }

  /**
   * Update all or one account balance
   *
   * @param id Account id
   */
  async updateAccountsBalance(id?: string): Promise<void> {
    console.log('updateAccountsBalance..........')
    if (id) {
      const selectAccount = this._accountMap.get(id)
      if (selectAccount) {
        selectAccount.updateBalance(await this.getAccountBalance(selectAccount.address))
      }
    } else {
      for (const account of this._accountMap.values()) {
        account.updateBalance(await this.getAccountBalance(account.address))
      }
    }
  }

  async updateAddressLockMoney(id?: string): Promise<void> {
    if (id) {
      const selectAccount = this._accountMap.get(id)
      if (selectAccount) {
        const lockMoney = await this.getAddressLockMoney(selectAccount.address)
        selectAccount.updatelockMoney(lockMoney)
      }
    } else {
      for (const account of this._accountMap.values()) {
        const lockMoney = await this.getAddressLockMoney(account.address)
        account.updatelockMoney(lockMoney)
      }
    }
  }

  /**
   * Update all or one account nonce
   * @param id Account id
   */
  async updateAccountsNonce(id?: string): Promise<void> {
    if (id) {
      const selectAccount = this._accountMap.get(id)
      if (selectAccount) {
        const nonceOnChain = await this.getAccountNonce(selectAccount.address)
        if (this.verifyAccountNonce(selectAccount.address, nonceOnChain)) {
          // console.log(`chain nonce is`, nonceOnChain, `account nonce is`, selectAccount.nonce, `verify true`)
          selectAccount.updateNonce(nonceOnChain)
        }
      }
    } else {
      for (const account of this._accountMap.values()) {
        const nonceOnChain = await this.getAccountNonce(account.address)
        if (this.verifyAccountNonce(account.address, nonceOnChain)) {
          // console.log(`chain nonce is`, nonceOnChain, `account nonce is`, account.nonce, `verify true`)
          account.updateNonce(nonceOnChain)
        }
      }
    }
  }

  /**
   * verifys the nonce should be updated
   * @param address
   * @param nonce
   */
  verifyAccountNonce(address: string, nonce: string): boolean {
    const txs = (this._store.transaction.transactionsMap.get(address) || []).filter((tx: any) => tx.from === address).slice()
    const nonceNumber = Number(nonce)
    const now = new Date().valueOf()
    // console.log('===============verifying==========', address, nonce)
    if (txs) {
      txs.sort((a: any, b: any) => Number(b.nonce) - Number(a.nonce))
      for (const tx of txs) {
        // console.log('verifyAccountNonce', tx.nonce)
        if (!tx.isOverLongTime(now) && !(tx.isEnded && tx.status !== TRANSACTION_STATUS_SUCCESS)) {
          if (Number(tx.nonce) >= nonceNumber) {
            return false
          } else {
            return true
          }
        }
      }
      return true
    } else {
      return true
    }
  }

  /**
   * Get account balance from the chain
   * @param address Account Address
   */
  private async getAccountBalance(address: string): Promise<string> {
    try {
      const res = await this._store.dipperin!.dr.getBalance(address)
      return res || '0'
    } catch (err) {
      return ''
    }
  }

  private async getAddressLockMoney(address: string): Promise<string> {
    try {
      const res = await this._store.dipperin!.dr.getLockedMoney(address)
      return res || '0'
    } catch (err) {
      return ''
    }
  }

  /**
   * Get account nonce from the chain
   * @param address Account Address
   */
  private async getAccountNonce(address: string): Promise<string> {
    try {
      const res = await this._store.dipperin!.dr.getNonce(address)
      return res || '0'
    } catch (err) {
      return ''
    }
  }

  // clear account map
  clear() {
    this._accountMap.clear()
  }

  /**
   * Account builder
   *
   * @param id
   * @param path
   * @param address
   */
  private newAccount(id: string, path: string, address: string, name: string): AccountModel {
    return new AccountModel(id, path, address, name)
  }

  private importAccount(id: string, address: string, privateKey: string): AccountModel {
    const newPath = `${ACCOUNTS_PATH}/${0}`
    const opt: Opt = {
      type: AccountType.privateKey,
      encryptKey: Accounts.encrypt(privateKey, this._store.wallet.getPrivateKeyByPath(newPath))
    }
    const newAccount = new AccountModel(id, newPath, address, '', opt)
    return newAccount
  }

  /**
   * Get safe account Index
   */
  private getSafeAccountIndex(): string {
    let maxId = 1
    for (const account of this._accountMap.values()) {
      if (account.isHDWallet()) {
        const id = Number(account.path.split('/').slice(-1))
        if (id > maxId) {
          maxId = id
        }
      }
    }
    return (maxId + 1).toString()
  }

  /**
   * @example get the activeAccount's privateKey by the following steps
   * ```ts
   * accountStore.exportPrivateKey()
   * => ''
   * ```
   */
  exportPrivateKey(password: string) {
    if (this.activeAccount!.isHDWallet()) {
      const privateKey = this._store.wallet.getPrivateKeyByPath(this.activeAccount!.path)
      return privateKey
    } else if (this.activeAccount!.isPrivateKey()) {
      const path = this.activeAccount!.path
      const prv0 = this._store.wallet.getPrivateKeyByPath(path)
      return Accounts.decrypt(this.activeAccount!.encrypt as EncryptResult, prv0).seed
    }
    return ''
  }
}

// animal enter candy frame garbage thought whip obvious artefact mean tuition pepper
// toy fit wisdom split inform van puzzle blanket just meadow frame pulp
// knock eight ocean spread early auto snap ignore protect orange you solve
