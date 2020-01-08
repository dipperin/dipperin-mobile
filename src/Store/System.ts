import { observable, action } from "mobx";
import {
  setStorage,
  getStorage
} from 'Db'
import i18n from "I18n";

class System {
  @observable loading: boolean = true // loading data from storage
  @observable curLanguage: string = '' // Current Language
  @observable fingerUnLock: boolean = false // Fingerprint unlock
  @observable fingerPay: boolean =  false // Fingerprint payment

  /**
   * async init
   */
  public async init() {
    this.curLanguage = await getStorage('Language')
    i18n.changeLanguage(this.curLanguage)
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
}

export default System