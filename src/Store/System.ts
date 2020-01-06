import { observable, action } from "mobx";
import { VENUS } from "Global/constants";


class System {
  @observable curLanguage: string = 'zh' // 当前语言
  @observable curSystemNodeAddr: string = VENUS // 当前节点地址
  @observable fingerUnLock: boolean = false // 指纹解锁
  @observable fingerPay: boolean =  false // 指纹支付

  @action setFingerUnLock = (value: boolean) => {
    this.fingerUnLock = value
  }

  @action setFingerPay = (value: boolean) => {
    this.fingerPay = value
  }
}

export default System