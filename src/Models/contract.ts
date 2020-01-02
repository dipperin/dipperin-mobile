import { observable, computed, action } from 'mobx'
import { Contract } from '@dipperin/dipperin.js'
import BN from 'bignumber.js'
import {
  TRANSACTION_STATUS_PENDING,
  TRANSACTION_STATUS_SUCCESS,
  TRANSACTION_STATUS_FAIL,
  TRANSACTION_LIMIT_TIME
} from '@/utils/constants'
import { getNowTimestamp } from '@/utils'

const CONTRACT_TYPE_ERC20 = 'ERC20'

class ContractModel {
  @observable
  private _status: string = TRANSACTION_STATUS_PENDING
  @observable
  private _contractAddress: string
  @observable
  private _contractData: string
  @observable
  private _timestamp: number
  @observable
  private _balance: string
  @observable
  private _txHash: string

  private _type: string = CONTRACT_TYPE_ERC20
  private _owner: string
  private _tokenName: string
  private _tokenDecimals: number
  private _tokenSymbol: string
  private _tokenTotalSupply: string

  static fromObj(obj: ContractObj) {
    return new ContractModel(
      obj.tokenName,
      obj.tokenSymbol,
      obj.tokenTotalSupply,
      obj.tokenDecimals,
      obj.type,
      obj.owner,
      obj.status,
      obj.contractAddress,
      obj.timestamp,
      obj.balance,
      obj.txHash
    )
  }

  constructor(
    tokenName: string,
    tokenSymbol: string,
    tokenTotalSupply: string,
    tokenDecimals: number = 18,
    type: string = CONTRACT_TYPE_ERC20,
    owner?: string,
    status?: string,
    contractAddress?: string,
    timestamp?: number,
    balance?: string,
    txHash?: string
  ) {
    this._tokenName = tokenName
    this._tokenDecimals = tokenDecimals
    this._tokenSymbol = tokenSymbol
    this._tokenTotalSupply = tokenTotalSupply
    this._status = status || TRANSACTION_STATUS_PENDING
    this._balance = balance ? balance : '0'

    if (type) {
      this._type = type
    }

    if (contractAddress) {
      this._contractAddress = contractAddress
    }

    if (owner) {
      this._owner = owner
    }

    if (txHash) {
      this._txHash = txHash
    }

    this._timestamp = timestamp || getNowTimestamp()

    this.createContract()
  }

  @computed
  get status() {
    return this._status
  }

  get owner() {
    return this._owner
  }

  get tokenName() {
    return this._tokenName
  }

  get tokenDecimals() {
    return this._tokenDecimals
  }

  get tokenSymbol() {
    return this._tokenSymbol
  }

  get tokenTotalSupply() {
    return this._tokenTotalSupply
  }

  get type() {
    return this._type
  }

  @computed
  get timestamp() {
    return this._timestamp
  }

  @computed
  get contractAddress() {
    return this._contractAddress
  }

  @computed
  get contractData() {
    return this._contractData
  }

  @computed
  get balance() {
    return this._balance
  }

  set balance(value: string) {
    this._balance = new BN(value).lt('0') ? '0' : value
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

  toJS(): ContractObj {
    const {
      contractAddress,
      status,
      tokenDecimals,
      tokenName,
      tokenSymbol,
      tokenTotalSupply,
      type,
      timestamp,
      owner,
      balance,
      txHash
    } = this

    return {
      contractAddress,
      status,
      timestamp,
      tokenDecimals,
      tokenName,
      tokenSymbol,
      tokenTotalSupply,
      type,
      owner,
      balance,
      txHash
    }
  }

  @action
  private createContract(): void {
    const contract = Contract.createContract(
      {
        owner: this._owner,
        tokenDecimals: this._tokenDecimals,
        tokenName: this._tokenName,
        tokenSymbol: this._tokenSymbol,
        tokenTotalSupply: this._tokenTotalSupply
      },
      this._type,
      this._contractAddress
    )

    this._contractAddress = contract.contractAddress
    this._contractData = contract.contractData
  }
}

export default ContractModel

export interface ContractObj {
  contractAddress: string
  status: string
  timestamp: number
  tokenDecimals: number
  tokenName: string
  tokenSymbol: string
  tokenTotalSupply: string
  type: string
  owner: string
  balance: string
  txHash?: string
}
