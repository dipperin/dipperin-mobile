import RootStore from './root'
import {
  METHOD_INPUTS,
  REGISTER_PASSWORD,
  QUERY_PASSWORD_BY_ADDR,
  QUERY_ADDR_BY_PASSWORD,
  CONTRACT_ADDRESS,
  DEFAULT_GASLIMIT,
} from 'Global/constants'
import { createCallMethod } from 'Global/utils'
import { observable, action } from 'mobx'
import { Utils } from '@dipperin/dipperin.js'

class ContractStore {
  _relay: RootStore
  @observable shortwordMap: Map<string, string> = new Map()
  @action insertShortword = (addr: string, shortword: string) => {
    this.shortwordMap.set(addr, shortword)
  }

  constructor(root: RootStore) {
    this._relay = root
  }

  registerShortword = async (word: string, gasPrice = 1) => {
    const callData = createCallMethod(
      REGISTER_PASSWORD,
      METHOD_INPUTS[REGISTER_PASSWORD],
      [word],
    )
    return this._relay.transaction.confirmTransaction(
      CONTRACT_ADDRESS,
      '0',
      callData,
      DEFAULT_GASLIMIT,
      String(gasPrice),
    )
  }

  queryAddressByShordword = async (word: string) => {
    try {
      const callData = createCallMethod(
        QUERY_ADDR_BY_PASSWORD,
        METHOD_INPUTS[QUERY_ADDR_BY_PASSWORD],
        [word],
      )
      const tx = this._relay.transaction.getSignedTransactionData(
        CONTRACT_ADDRESS,
        '0',
        callData,
        DEFAULT_GASLIMIT,
        '1',
      )
      const result = await this._relay.dipperin!.dr.callConstFunc(
        tx.signedTransactionData as string,
        0,
      )
      if (typeof result === 'string' && Utils.isAddress(result)) {
        return result
      }
      return ''
    } catch (error) {
      return ''
    }
  }

  queryShortwordByAddr = async (address: string) => {
    try {
      const callData = createCallMethod(
        QUERY_PASSWORD_BY_ADDR,
        METHOD_INPUTS[QUERY_PASSWORD_BY_ADDR],
        [address],
      )
      const tx = this._relay.transaction.getSignedTransactionData(
        CONTRACT_ADDRESS,
        '0',
        callData,
        DEFAULT_GASLIMIT,
        '1',
      )
      const result = await this._relay.dipperin!.dr.callConstFunc(
        tx.signedTransactionData as string,
        0,
      )
      if (typeof result === 'string') {
        this.insertShortword(address, result)
        return result
      } else {
        return ''
      }
    } catch (error) {
      return ''
    }
  }
}

export default ContractStore
