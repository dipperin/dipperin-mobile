import { observable, action } from "mobx";
import { VENUS } from "Global/constants";
import { getStorage, setStorage } from "Db"


class System {
  @observable loading: boolean = true // loading data from storage
  @observable curLanguage: string = 'zh' // 当前语言
  @observable curSystemNodeAddr: string = VENUS // 当前节点地址
  @observable fingerUnLock: boolean = false // 指纹解锁
  @observable fingerPay: boolean = false // 指纹支付
  @observable isEyeOpen: boolean = true
  constructor() {

  }

  @action
  async init() {
    const res = await getStorage('isEyeOpen')
    if (typeof res === 'boolean') {
      this.isEyeOpen = res
    }else{
      this.isEyeOpen = true
    }

  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading
  }

  @action setFingerUnLock = (value: boolean) => {
    this.fingerUnLock = value
  }

  @action setFingerPay = (value: boolean) => {
    this.fingerPay = value
  }

  @action setCurSystemNodeAddr = (_value: string) => {
    this.curSystemNodeAddr = _value
  }

  @action setCurLanguage = (_value: string) => {
    this.curLanguage = _value
  }
  @action setIsEyeOpen=(val:boolean)=>{
    this.isEyeOpen = val
    setStorage('isEyeOpen',val)
  }
}

export default System