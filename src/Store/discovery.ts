import {observable, action,} from 'mobx'
// import * as api from "Server/index"
import { appsInterface, contractInterface, fortuneInterface } from 'Global/inteface'

export default class discoveryStore {
  @observable appsList:appsInterface[] = []
  @observable contractsList:contractInterface[] = []
  // @observable fortuneList:fortuneInterface = []

  @action getAppsList = async() => {
    // const res = await api.getAppsList({
    //   order_by: "balance",
    //   page: 1,
    //   per_page: 10
    // })
    // this.appsList = res
  }
  @action getContractList = async() => {
    this.contractsList = []
  }
  @action getFortuneList = async() => {
    // this.fortuneList = []
  }
}