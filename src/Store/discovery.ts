import {observable, action,} from 'mobx'
import * as api from "Server/index"
import { 
  appsInterface,
  appsResourceInterface,
  contractInterface,
  appsRes,
  fortuneRes,
  AppParams,
  FortuneParams
} from 'Global/inteface'


export default class discoveryStore {
  @observable appsList: appsRes = {
    total_page: 1,
    total_count: 0,
    app_data: []
  }
  @observable appResource: appsResourceInterface[] = []
  @observable contractsList:contractInterface[] = []
  @observable fortuneList: fortuneRes = {
    total_count: 0,
    account_list: []
  }
  @observable totalBlocks: number = 0

  @action
  updateAppsList = (res: any) => {
    this.appsList = res.data
    this.appResource = res.app
  }
  @action
  updateFortuneList = (data: fortuneRes) => {
    this.fortuneList = data
  }
  @action
  updateBlockHeight = (data:number) => {
    this.totalBlocks = data
  }
  @action getAppsList = async(params: AppParams) => {
    const res = await api.getAppsList(params)
    this.updateAppsList(res)
  }
  @action getContractList = async() => {
    this.contractsList = []
  }
  @action getFortuneList = async(params: FortuneParams) => {
    const res = await api.getFortuneList(params)
    if(res) {
      this.updateFortuneList(res)
    }
  }
  @action getBlockHeight = async() => {
    const res = await api.getBlockHeight()
    if(res && res.total_blocks) {
      this.updateBlockHeight(res.total_blocks)
    }
  }
}