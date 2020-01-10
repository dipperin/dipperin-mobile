import RootStore from './root';
import {
  METHOD_INPUTS,
  REGISTER_PASSWORD,
  QUERY_PASSWORD_BY_ADDR,
  QUERY_ADDR_BY_PASSWORD,
  CONTRACT_ADDRESS,
} from 'Global/constants';
import {createCallMethod} from 'Global/utils';

class ContractStore {
  _relay: RootStore;

  constructor(root: RootStore) {
    this._relay = root;
  }

  registerShortword = async (word: string, gasPrice = 1) => {
    const callData = createCallMethod(
      REGISTER_PASSWORD,
      METHOD_INPUTS[REGISTER_PASSWORD],
      [word],
    );
    return this._relay.transaction.confirmTransaction(
      CONTRACT_ADDRESS,
      '0',
      callData,
      '100000000',
      String(gasPrice),
    );
  };

  queryAddressByShordword = async (word: string) => {
    try {
      const callData = createCallMethod(
        QUERY_ADDR_BY_PASSWORD,
        METHOD_INPUTS[QUERY_ADDR_BY_PASSWORD],
        [word],
      );
      const tx = this._relay.transaction.getSignedTransactionData(
        CONTRACT_ADDRESS,
        '0',
        callData,
        '10000000',
        '1',
      );
      const result = await this._relay.dipperin!.dr.callConstFunc(
        tx.signedTransactionData as string,
        0,
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

  queryShortwordByAddr = async (address: string) => {
    try {
      const callData = createCallMethod(
        QUERY_PASSWORD_BY_ADDR,
        METHOD_INPUTS[QUERY_PASSWORD_BY_ADDR],
        [address.toLowerCase()],
      );
      const tx = this._relay.transaction.getSignedTransactionData(
        CONTRACT_ADDRESS,
        '0',
        callData,
        '10000000',
        '1',
      );
      const result = await this._relay.dipperin!.dr.callConstFunc(
        tx.signedTransactionData as string,
        0,
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default ContractStore;
