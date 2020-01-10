import { observable, action } from "mobx";
import { VENUS } from "Global/constants";
import { getStorage, setStorage, resetDB } from "Db"
import i18n from "I18n"
import RootStore from './root'


class System {
  private _store: RootStore
  @observable loading: boolean = true // loading data from storage
  @observable curLanguage: string = '' // Current Language
  @observable fingerUnLock: boolean = false // Fingerprint unlock
  @observable fingerPay: boolean =  false // Fingerprint payment
  @observable curSystemNodeAddr: string = VENUS // 当前节点地址

  @observable isEyeOpen: boolean = true
  constructor(root: RootStore) {
    this.init()
    this._store = root
  }

  @action
  async init() {
    this.curLanguage = await getStorage('Language')
    i18n.changeLanguage(this.curLanguage)
    const res = await getStorage('isEyeOpen')
    if (typeof res === 'boolean') {
      this.isEyeOpen = res
    }else{
      this.isEyeOpen = true
    }

  }

  @action
  public setLoading(loading: boolean) {
    this.loading = loading
  }

  @action 
  public setFingerUnLock = (value: boolean) => {
    this.fingerUnLock = value
  }

  @action 
  public setFingerPay = (value: boolean) => {
    this.fingerPay = value
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