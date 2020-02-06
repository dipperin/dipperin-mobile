import Dipperin, { Utils } from '@dipperin/dipperin.js'
import blockInfo from '../testData/block'
import { mockAddContract } from '../testData/contracts'

const mockDipperinBuilder = (): Dipperin => {
  const dipperin = new Dipperin('http://localhost:7783')

  dipperin.dr.getBalance = jest.fn(async () => Utils.toUnit('10000'))
  dipperin.dr.getNonce = jest.fn(async () => '12')
  dipperin.dr.setMineCoinbase = jest.fn().mockResolvedValue('')
  dipperin.dr.getCurrentBlock = jest.fn(async () => blockInfo)
  dipperin.dr.getTransaction = jest.fn(async () => ({
    blockNumber: 1,
    blockHash: '',
    transaction: null,
    transactionIndex: 1,
  }))
  dipperin.dr.contract.getContractDetail = jest
    .fn()
    .mockImplementation(async () => mockAddContract)
  dipperin.net.isConnecting = jest.fn(async () => true)
  return dipperin
}

export default mockDipperinBuilder
