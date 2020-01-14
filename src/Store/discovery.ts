import {observable, action,} from 'mobx'
import * as api from "Server/index"
import { 
  appsInterface,
  appsResourceInterface,
  contractInterface,
  appsRes,
  fortuneRes,
  AppParams,
  FortuneParams,
  ContractParams,
  ContractRes,
  fortuneInterface
} from 'Global/inteface'


export default class discoveryStore {

  @observable appsListTotalPage: number = 0
  @observable appsListCurPage: number = 1
  @observable appsListPerPage: number = 10
  @observable appsList: appsInterface[] | [] = []
  @observable appResource: appsResourceInterface[] | [] = []

  @observable contractsListTotalPage: number = 0
  @observable contractsListCurPage: number = 1
  @observable contractsListPerPage: number = 1
  @observable contractsList:contractInterface[] = []

  @observable fortuneListTotalPage: number = 0
  @observable fortuneListCurPage: number = 1
  @observable fortuneListPerPage: number = 1
  @observable fortuneList: fortuneInterface[] | [] = []

  @observable totalBlocks: number = 0

  @action updateAppsList = (res: appsRes) => {
    this.appResource = res.app
    this.appsListTotalPage = res.data.total_count
    if(this.appsListCurPage === 1) {
      this.appsList = res.data.app_data
    }else{
      this.appsList = [...this.appsList, ... res.data.app_data]
    }
  }
  @action updateFortuneList = (data: fortuneRes) => {
    this.fortuneListTotalPage = data.total_count
    if(this.fortuneListCurPage === 1) {
      this.fortuneList = data.account_list
    }else{
      this.fortuneList = [...this.fortuneList, ... data.account_list]
    }
  }
  @action updateBlockHeight = (data:number) => {
    this.totalBlocks = data
  }
  @action updateContractsList = (res:ContractRes) => {
    this.contractsListTotalPage = res.data.total_count
    if(this.appsListCurPage === 1) {
      this.contractsList = res.data.contract_data
    }else{
      this.contractsList = [...this.contractsList, ... res.data.contract_data]
    }
  }
  @action getAppsList = async(params: AppParams) => {
    const res = await api.getAppsList(params)
    this.appsListCurPage = params.page
    if(res) {
      this.updateAppsList(res)
    }
  }
  @action getContractList = async(params:ContractParams) => {
    const res = await api.getContactsList(params)
    this.contractsListCurPage = params.page
    if(res) {
      this.updateContractsList(res)
    }
  }
  @action getFortuneList = async(params: FortuneParams) => {
    const res = await api.getFortuneList(params)
    this.fortuneListCurPage = params.page
    res && this.updateFortuneList(res)
  }
  @action getBlockHeight = async() => {
    const res = await api.getBlockHeight()
    if(res && res.total_blocks) {
      this.updateBlockHeight(res.total_blocks)
    }
  }
}