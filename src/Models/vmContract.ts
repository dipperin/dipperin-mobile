import { observable, computed, action } from 'mobx'
import {
  TRANSACTION_STATUS_PENDING,
  TRANSACTION_STATUS_SUCCESS,
  TRANSACTION_STATUS_FAIL,
  TRANSACTION_LIMIT_TIME
} from '@/utils/constants'
import { getNowTimestamp } from '@/utils'
import { VmContract } from '@dipperin/dipperin.js'

class ContractModel {
  @observable
  private _status: string = TRANSACTION_STATUS_PENDING
  @observable
  private _contractAddress: string
  @observable
  private _contractAbi: string
  @observable
  private _timestamp: number
  @observable
  private _txHash: string
  @observable
  private _owner: string[]
  @observable
  private _isDRC20: boolean
  @observable
  private _contractName: string = ''

  @observable
  private _contractData: string

  @observable
  private _DRC20Token?: string

  static fromObj(obj: VmContractObj) {
    return new ContractModel(obj)
  }

  constructor(options: VmContractOptions) {
    if (options.owner instanceof Array) {
      this._owner = options.owner
    } else {
      this._owner = [options.owner]
    }
    this._status = options.status || TRANSACTION_STATUS_PENDING
    this._contractAddress = options.contractAddress || ''
    this._contractName = options.contractName || ''
    if (options.txHash) {
      this._txHash = options.txHash
    }
    this._timestamp = options.timestamp || getNowTimestamp()
    this._contractAbi = options.contractAbi
    if (options.contractCode) {
      this.createContract(options.contractCode, options.contractAbi, options.initParams || [])
    }

    this._isDRC20 = this._getIsDRC20(options)
  }

  @computed
  get owner() {
    return this._owner
  }

  @computed
  get status() {
    return this._status
  }

  @computed
  get timestamp() {
    return this._timestamp
  }

  @computed
  get contractAddress() {
    return this._contractAddress
  }

  set contractAddress(address: string) {
    if (address) {
      this._contractAddress = address
    }
  }

  get contractAbi() {
    return this._contractAbi
  }

  get contractData() {
    return this._contractData
  }
  get contractName() {
    return this._contractName
  }

  @computed
  get isEnded(): boolean {
    return this._status !== TRANSACTION_STATUS_PENDING
  }

  set txHash(hash: string) {
    this._txHash = hash
  }

  @computed
  get txHash(): string {
    return this._txHash
  }

  @computed
  get isSuccess(): boolean {
    return this.status === TRANSACTION_STATUS_SUCCESS
  }

  @computed
  get isDRC20(): boolean {
    return this._isDRC20
  }

  @computed
  get DRC20Token(): string | undefined {
    return this._DRC20Token
  }

  @action
  setDRC20Token(token: string) {
    this._DRC20Token = token
  }

  @action
  addOwner = (address: string) => {
    if (this._owner instanceof Array) {
      this._owner.push(address)
    } else {
      this._owner = [this._owner, address]
    }
  }
  @action
  setName = (name: string) => {
    this._contractName = name
  }

  isOverTime(now: number): boolean {
    return now - this._timestamp > TRANSACTION_LIMIT_TIME
  }

  isOverLongTime(now: number): boolean {
    return now - this._timestamp > TRANSACTION_LIMIT_TIME * 10
  }

  @action
  setSuccess() {
    this._status = TRANSACTION_STATUS_SUCCESS
  }

  @action
  setFail() {
    this._status = TRANSACTION_STATUS_FAIL
  }

  createContract(code: string, abi: string, params: string[]): void {
    this._contractData = VmContract.createVmContract(code, abi, ...params)
  }

  hasOwner = (address: string) => {
    return this._owner.includes(address)
  }

  toJS(): VmContractObj {
    const { owner, contractAddress, status, timestamp, txHash, contractAbi, contractName } = this

    return {
      contractName,
      owner,
      contractAddress,
      contractAbi,
      status,
      timestamp,
      txHash
    }
  }

  private _getIsDRC20(options: VmContractOptions): boolean {
    try {
      let isDRC20 = false
      const { contractAbi } = options
      const abi = VmContract.convertAbiStrToAbiJSON(contractAbi)
      const transfer = abi.find(item => item.name === 'transfer') as any
      const getBanlance = abi.find(item => item.name === 'getBalance') as any
      const isDRC20Transfer =
        transfer!.inputs.length === 2 &&
        transfer.inputs[0].type === 'string' &&
        transfer.inputs[1].type === 'uint64' &&
        transfer.outputs.length === 1 &&
        transfer.outputs[0].type === 'bool'
      const isDRC20GetBanlace =
        getBanlance.inputs.length === 1 &&
        getBanlance.inputs[0].type === 'string' &&
        getBanlance.outputs.length === 1 &&
        getBanlance.outputs[0].type === 'uint64'
      if (isDRC20Transfer && isDRC20GetBanlace) {
        isDRC20 = true
      }
      return isDRC20
    } catch (_) {
      return false
    }
  }
}

export default ContractModel

interface VmContractOptions {
  contractAbi: string
  owner: string | string[]
  contractAddress?: string
  contractCode?: string
  status?: string
  timestamp?: number
  txHash?: string
  initParams?: string[]
  isDRC20?: boolean
  contractName?: string
}

export interface VmContractObj {
  contractName: string
  owner: string[]
  contractAddress: string
  contractAbi: string
  status: string
  timestamp: number
  txHash?: string
}

export interface VmContractAbiInput {
  name: string
  type: string
}
export interface VmcontractAbi {
  name: string
  inputs: VmContractAbiInput[]
  outputs?: VmContractAbiInput[]
  constant?: string
  type: string
}
