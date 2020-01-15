import { observable, action, computed } from "mobx";
import { VENUS, STORAGE_KEYS } from "Global/constants";
import { getStorage, setStorage, resetDB } from "Db"
import i18n from "I18n"
import RootStore from './root'
import i18next from "i18next";


class System {
  private _store: RootStore
  @observable loading: boolean = true // loading data from storage
  @observable curLanguage: string = i18next.language // Current Language
  @observable private _fingerUnLock: boolean = false // Fingerprint unlock
  @observable private _fingerPay: boolean =  false // Fingerprint payment
  @observable curSystemNodeAddr: string = VENUS // current node

  @observable isEyeOpen: boolean = true
  constructor(root: RootStore) {
    this.init()
    this._store = root
  }

  @action
  async init() {
    this.curLanguage = await getStorage('Language') || i18next.language
    this._fingerUnLock = await getStorage(STORAGE_KEYS.FINGERPRINT_UNLOCK)
    this._fingerPay = await getStorage(STORAGE_KEYS.FINGERPRINT_PAY)
    i18n.changeLanguage(this.curLanguage)
    const res = await getStorage('isEyeOpen')
    if (typeof res === 'boolean') {
      this.isEyeOpen = res
    }else{
      this.isEyeOpen = true
    }
  }

  @computed get fingerUnLockStatus() {
    return this._fingerUnLock
  }

  @computed get fingerPayStatus() {
    return this._fingerPay
  }

  @action
  public setLoading(loading: boolean) {
    this.loading = loading
  }

  @action 
  public setFingerUnLock = (value: boolean) => {
    this._fingerUnLock = value
    setStorage(STORAGE_KEYS.FINGERPRINT_UNLOCK, value)
  }

  @action 
  public setFingerPay = (value: boolean) => {
    this._fingerPay = value
    setStorage(STORAGE_KEYS.FINGERPRINT_PAY, value)
  }

  @action 
  public setCurLanguage = (_value: string) => {
    this.curLanguage = _value
    setStorage('Language', _value)
  }
  @action setIsEyeOpen=(val:boolean)=>{
    this.isEyeOpen = val
    setStorage('isEyeOpen',val)
  }

  resetWallet = () => {
    this._store.wallet.clear()
    this._store.account.clear()
    this._store.transaction.clear()
    resetDB()
  }
}

export default System