import BIP39 from 'bip39'
import { noop } from 'lodash'
import { observable, reaction, computed, action, runInAction } from 'mobx'
import { Accounts, AccountObject } from '@dipperin/dipperin.js'

// import settings from '@/utils/settings'
// import {
//   getWallet,
//   insertWallet,
//   updateErrTimes,
//   updateLockTime,
//   updateActiveId
//   // insertMinerData,
//   // removeMinerData
// } from '@/db'

import RootStore from './root'
import WalletModel, { WalletObj } from 'Models/wallet'
import {
  WALLET_ID,
  DEFAULT_ERR_TIMES,
  DEFAULT_LOCK_TIME,
  LOCKTIMES,
  FIRST_ACCOUNT_ID,
} from 'Global/constans'

export default class WalletStore {
  private _store: RootStore
  private _mnemonic?: string // Mnemonic

  @observable
  private _currentWallet?: WalletModel // current wallet

  @observable
  private _hdAccount?: AccountObject // Seed

  @observable
  private _blockInfo: any

  // @observable
  // private _isConnecting: boolean = false

  destroyMnemonic: () => void = noop

  constructor(store: RootStore) {
    this._store = store
    reaction(
      () => this.unlockErrTimes,
      errTimes => {
        if (this._currentWallet) {
          // updateErrTimes(this._currentWallet.walletId, errTimes) // TODO update in storage
          this.checkUnlockErrTimes(errTimes)
        }
      }
    )

    reaction(
      () => this.lockTime,
      lockTime => {
        if (this._currentWallet) {
          // updateLockTime(this._currentWallet.walletId, lockTime) // TODO update in storage
        }
      }
    )
  }

  @computed
  get isHaveWallet() {
    return !!this._currentWallet
  }

  @computed
  get mnemonic() {
    return this._mnemonic
  }

  @computed
  get walletId(): number {
    return this._currentWallet ? this._currentWallet.walletId : 0
  }

  @computed
  get isUnlock(): boolean {
    return !!this._hdAccount
  }

  @computed
  get lockTime(): string {
    return this._currentWallet ? this._currentWallet!.lockTime : DEFAULT_LOCK_TIME
  }

  @computed
  get unlockErrTimes(): number {
    return this._currentWallet ? this._currentWallet!.unlockErrTimes : DEFAULT_ERR_TIMES
  }

  @computed
  get showLock(): boolean {
    return this._currentWallet ? this._currentWallet.showLock : false
  }

  @computed
  get hdAccount() {
    return this._hdAccount
  }

  @computed
  get activeAccountId(): string {
    return this._currentWallet ? this._currentWallet.activeAccountId : '1'
  }

  set activeAccountId(id: string) {
    if (this._currentWallet) {
      this._currentWallet.activeAccountId = id
      // updateActiveId(this.walletId, id) // TODO update in storage
    }
  }

  get blockInfo() {
    return this._blockInfo
  }

  // get isConnecting() {
  //   return this._isConnecting
  // }

  /**
   * Toggle wallet lock
   * @param isLock
   */
  toggleLock(isLock: boolean): void {
    this._currentWallet!.showLock = isLock
  }

  /**
   * Get private key by path from this seed
   *
   * @param path
   */
  getPrivateKeyByPath(cpath: string): string {
    return this.getAccountByPath(cpath).privateKey
  }

  /**
   * Get derive account by path
   * @param path Derive path
   */
  getAccountByPath(cpath: string) {
    return this._hdAccount!.derivePath(cpath)
  }

  /**
   * Unlock wallet
   * @param password
   */
  @action
  unlockWallet(password: string): boolean {
    const account = this.getHdAccount(password)
    if (account) {
      this._hdAccount = account
      // if (this._store.isConnecting) { // TODO
      //   this.startService()
      // }
      return true
    }
    return false
  }

  /**
   * Check Password
   * @param password
   */
  checkPassword(password: string): boolean {
    const account = this.getHdAccount(password)
    return account ? true : false
  }

  /**
   * Get current block data
   */
  // async getCurrentBlock() { // TODO move to chain data
  //   const res = await this._store.dipperin.dr.getCurrentBlock()
  //   if (res) {
  //     const blockInfo = {
  //       ...res.header,
  //       transactions: res.body.transactions ? res.body.transactions.length : 0
  //     }
  //     runInAction(() => {
  //       this._blockInfo = blockInfo
  //     })
  //   } else {
  //     console.error(`can't get block info`)
  //   }
  // }

  /**
   * Create a new Wallet
   *
   * @param password wallet decrypt password
   */
  create = async (password: string, mnemonic?: string): Promise<Error | void> => {
    // this._store.loading.start() // TODO
    try {
      if (!mnemonic) {
        // If not input a mnemonic, generate a new mnemonic and save
        this.destroyMnemonic = this.createDestroyMnemonic(password)
      } else {
        await this.initWallet(password, mnemonic)
      }
    } catch (err) {
      return err
    } finally {
      // this._store.loading.stop() // TODO
    }
  }

  /**
   * Save wallet to db
   */
  save() {
    // this.saveWallet() // TODO
  }

  /**
   * Load wallet from data store
   */

  // async load(): Promise<boolean> { // TODO
  //   const walletId = settings.get(WALLET_ID) as number
  //   const walletObj = await getWallet(walletId)
  //   if (!walletObj) {
  //     // FIXME: When the wallet cannot be successfully loaded, an error message should pop up.
  //     return false
  //   }
  //   try {
  //     runInAction(() => {
  //       this._currentWallet = new WalletModel(walletObj)
  //     })
  //     return true
  //   } catch (err) {
  //     console.error(err)
  //     return false
  //   }
  // }

  @action
  resetBlockInfo() {
    this._blockInfo = undefined
  }

  /**
   * Clear all data
   */
  @action
  clear() {
    this._currentWallet = undefined
    this.resetBlockInfo()
  }

  /**
   * Start the loop update
   */
  // startUpdate() { // TODO move to chain data
  //   this.getCurrentBlock()

  //   this._store.timer.on('get-current-block', this.getCurrentBlock.bind(this), 10000)
  // }

  /**
   * Save wallet to db and save wallet id to setting
   */
  // private saveWallet(): void { // TODO
  //   // save current wallet id in settings
  //   settings.set(WALLET_ID, this._currentWallet!.walletId)
  //   insertWallet(this._currentWallet!.toJS())
  // }

  /**
   * Create Destroy mnemonic
   * @param password
   */
  @action
  private createDestroyMnemonic(password: string): () => void {
    const mnemonic = BIP39.generateMnemonic()
    this._mnemonic = mnemonic
    return () => {
      // Destroy mnemonic and init the wallet
      this.initWallet(password, mnemonic)
      // this._store.startUpdate() // TODO
      this._mnemonic = ''
    }
  }

  /**
   * Init the new wallet
   * @param password
   * @param mnemonic
   */
  @action
  private initWallet = async (password: string, mnemonic: string): Promise<void> => {
    // init wallet id
    const walletId = new Date().valueOf()
    // Try to parse mnemonic to seed, if fail, return error
    const seed = `0x${BIP39.mnemonicToSeedHex(mnemonic)}`
    const hdAccount = Accounts.create(seed)
    // save encrypt seed, an then clear password and mnemonic
    const encryptSeed = hdAccount.encrypt(password)
    const walletObj: WalletObj = {
      walletId,
      activeAccountId: FIRST_ACCOUNT_ID,
      encryptSeed,
      unlockErrTimes: DEFAULT_ERR_TIMES,
      lockTime: DEFAULT_LOCK_TIME
    }
    this._currentWallet = new WalletModel(walletObj)
    this._hdAccount = hdAccount
    // init account
    // await this._store.account.initAccount() // TODO
  }

  /**
   * Check if the number of unlock errors exceeds the limit
   * @param errTimes
   */
  @action
  private checkUnlockErrTimes(errTimes: number): void {
    if (errTimes >= LOCKTIMES) {
      const nowDateString = String(new Date().valueOf())
      // updateLockTime(this._currentWallet!.walletId, nowDateString) // TODO
      this._currentWallet!.lockTime = nowDateString
      this._currentWallet!.showLock = true
      this._currentWallet!.unlockErrTimes = 0
      // updateErrTimes(this._currentWallet!.walletId, 0) // TODO
    }
  }

  /**
   * unlock wallet / check password
   * get hd account
   */
  @action
  private getHdAccount(password: string): undefined | AccountObject {
    if (!this._currentWallet || !this._currentWallet.encryptSeed) {
      return
    }

    try {
      // console.log(this._currentWallet.encryptSeed)
      const account = Accounts.decrypt(this._currentWallet.encryptSeed, password)
      this._currentWallet.unlockErrTimes = DEFAULT_ERR_TIMES
      return account
    } catch (_) {
      const preErrTimes = this._currentWallet.unlockErrTimes
      let errTimes = preErrTimes ? preErrTimes : DEFAULT_ERR_TIMES
      this._currentWallet.unlockErrTimes = ++errTimes
      return
    }
  }


}
