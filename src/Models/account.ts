import { observable, computed, runInAction, action } from 'mobx'
import { Utils } from '@dipperin/dipperin.js'
import { EncryptResult } from '@dipperin/dipperin.js/build/module/dr/accounts'
import BigNumber from 'bignumber.js'

export enum AccountType {
  hd,
  privateKey
}

export interface Opt {
  nonce?: string
  type?: number
  encryptKey?: EncryptResult
}

export default class AccountModel {
  private _address: string
  private _nonce: string = '0'
  private _id: string
  private _path: string
  private _type: number = AccountType.hd
  private _privateKey: string = ''
  private _encryptKey: EncryptResult | undefined
  @observable
  private _name: string = ''

  @observable
  private _balance: BigNumber = new BigNumber(0)
  @observable
  private _lockMoney: BigNumber = new BigNumber(0)

  /**
   * Get Account model from an object
   * @param obj
   */
  static fromObj(obj: AccountObj) {
    return new AccountModel(obj.id.toString(), obj.path, obj.address, '', { nonce: obj.nonce })
  }

  constructor(id: string, path: string, address: string, name: string, opt?: Opt) {
    runInAction(() => {
      this._id = id
      this._path = path
      this._address = address
      this._name = name
      if (opt) {
        this._nonce = opt.nonce || '0'
        this._type = opt.type || AccountType.hd
        this._encryptKey = opt.encryptKey
      }
    })
  }

  @computed
  get id() {
    return this._id
  }

  @computed
  get path() {
    return this._path
  }

  @computed
  get address() {
    return this._address
  }

  @computed
  get nonce() {
    return this._nonce
  }

  @computed
  get type() {
    return this._type
  }
  @computed
  get name() {
    return this._name
  }

  isHDWallet() {
    return this._type === AccountType.hd
  }

  isPrivateKey() {
    return this._type === AccountType.privateKey
  }

  @computed
  get balance() {
    return Utils.fromUnit(this._balance.toString(10))
  }

  @computed
  get lockMoney() {
    return Utils.fromUnit(this._lockMoney.toString(10))
  }

  @computed
  get balanceUnit() {
    return this._balance.toString(10)
  }

  @computed
  get encrypt() {
    return this._encryptKey
  }

  /**
   * Update balance
   * @param balance An new balance
   */
  @action
  updateBalance(balance: string) {
    if (balance) {
      this._balance = new BigNumber(balance)
    }
  }

  @action
  updatelockMoney(lockMoney: string) {
    if (lockMoney) {
      this._lockMoney = new BigNumber(lockMoney)
    }
  }

  /**
   * Update account transaction nonce
   * @param nonce Account transaction nonce
   */
  @action
  updateNonce(nonce: string) {
    if (nonce) {
      this._nonce = nonce
    }
  }

  /**
   * Add account transaction nonce
   */
  @action
  plusNonce() {
    this._nonce = new BigNumber(this._nonce).plus(1).toString(10)
  }

  @action
  updatePrivateKey(key: string) {
    // TODO: use dipperin.js utils
    if (/^[0-9a-f]{64}$/.test(key.replace('0x', ''))) {
      this._privateKey = key
    } else {
      throw new Error('Invalid Private Key!')
    }
  }

  @computed
  get privateKey() {
    return this._privateKey
  }

  @action
  updateAccountType(type: number) {
    if (type in AccountType) {
      this._type = type
    }
  }
  @action
  updateAccountName(name: string) {
    this._name = name
  }

  /**
   * Transfer account model to Javascript object
   */
  toJS(): AccountObj {
    const opt: Opt = {}
    if (this._type !== AccountType.hd) {
      opt.type = this._type
      opt.encryptKey = this._encryptKey
    }

    return {
      opt,
      address: this.address,
      id: Number(this.id),
      nonce: this._nonce,
      path: this.path,
      name: this._name
    }
  }
}

export interface AccountObj {
  name: string
  address: string
  id: number
  nonce: string
  path: string
  opt?: Opt
}
