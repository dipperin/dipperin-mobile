import { observable, action, computed } from 'mobx'
import { EncryptResult } from '@dipperin/dipperin.js'

export default class WalletModel {
  @observable
  private _walletId: number
  // active account id
  @observable
  private _activeAccountId: string
  @observable
  private _showLock: boolean = false //  password error lock
  @observable
  private _unlockErrTimes: number = 0
  @observable
  private _lockTime: string = ''
  @observable
  private _encryptSeed?: EncryptResult // Seed encrypt json

  constructor(walletObj: WalletObj) {
    this.init(walletObj)
  }

  @action
  init(walletObj: WalletObj) {
    this._walletId = walletObj.walletId
    this._activeAccountId = walletObj.activeAccountId
    this._encryptSeed = walletObj.encryptSeed
    this._unlockErrTimes = walletObj.unlockErrTimes
    this._lockTime = walletObj.lockTime
  }

  get walletId() {
    return this._walletId
  }

  set activeAccountId(id: string) {
    this._activeAccountId = id
  }

  @computed
  get activeAccountId() {
    return this._activeAccountId
  }

  set showLock(flag: boolean) {
    this._showLock = flag
  }

  @computed
  get showLock(): boolean {
    return this._showLock
  }

  @computed
  get encryptSeed(): EncryptResult | undefined {
    return this._encryptSeed
  }

  set lockTime(time: string) {
    this._lockTime = time
  }

  @computed
  get lockTime(): string {
    return this._lockTime
  }

  set unlockErrTimes(times: number) {
    this._unlockErrTimes = times
  }

  @computed
  get unlockErrTimes(): number {
    return this._unlockErrTimes
  }

  /**
   * clear wallet (reset wallet)
   */
  @action
  clear() {
    this._encryptSeed = undefined
  }

  toJS(): WalletObj {
    return {
      walletId: this._walletId,
      activeAccountId: this._activeAccountId,
      encryptSeed: this._encryptSeed,
      unlockErrTimes: this.unlockErrTimes,
      lockTime: this._lockTime
    }
  }
}

export interface WalletObj {
  walletId: number
  activeAccountId: string
  encryptSeed?: EncryptResult
  unlockErrTimes: number
  lockTime: string
}
