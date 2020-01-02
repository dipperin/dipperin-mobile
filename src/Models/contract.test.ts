import ContractModel from './contract'
import {
  TRANSACTION_LIMIT_TIME
} from '@/utils/constants'

describe('models/contract', () => {
  const tokenName = 'name'
  const tokenSymbol = 'symbol'
  const tokenTotalSupply = '200000'
  const owner = '0x00009328d55ccb3fce531f199382339f0e576ee840b2'
  const contractAddress = '0x0010545f2151FD65e1661292BF6BE74EE59F6f69Ea91'
  const timestamp = 1548051209772
  let contract: ContractModel
  it('constructor', () => {
    contract = new ContractModel(
      tokenName,
      tokenSymbol,
      tokenTotalSupply,
      undefined,
      undefined,
      owner,
      undefined,
      contractAddress,
      timestamp
    )
    expect(contract.status).toBe('pending')
    expect(contract.owner).toBe(owner)
    expect(contract.tokenName).toBe(tokenName)
    expect(contract.tokenDecimals).toBe(18)
    expect(contract.tokenSymbol).toBe(tokenSymbol)
    expect(contract.tokenTotalSupply).toBe(tokenTotalSupply)
    expect(contract.type).toBe('ERC20')
  })

  it('contractData', () => {
    expect(contract.contractData).toEqual(
      '{"action":"create","contract_address":"0x0010545f2151FD65e1661292BF6BE74EE59F6f69Ea91","params":"{\\"owner\\":\\"0x00009328d55ccb3fce531f199382339f0e576ee840b2\\",\\"token_name\\":\\"name\\",\\"token_decimals\\":18,\\"token_symbol\\":\\"symbol\\",\\"token_total_supply\\":\\"0x30d40\\",\\"balances\\":{\\"0x00009328d55ccb3fce531f199382339f0e576ee840b2\\":\\"0x30d40\\"},\\"allowed\\":{}}"}'
    )
  })

  it('isOverTime', () => {
    expect(contract.isOverTime(timestamp + TRANSACTION_LIMIT_TIME + 1)).toEqual(true)
  })

  it('contract/setSuccess', () => {
    contract.setSuccess()
    expect(contract.status).toBe('success')
  })

  it('contract/fail', () => {
    contract.setFail()
    expect(contract.status).toBe('fail')
  })

  it('contract/toJS', () => {
    expect(contract.toJS()).toEqual({
      contractAddress,
      status: 'fail',
      timestamp,
      tokenDecimals: 18,
      tokenName,
      tokenSymbol,
      tokenTotalSupply,
      type: 'ERC20',
      owner,
      balance: '0'
    })
  })

  it('contract/fromObj', () => {
    expect(() => {
      ContractModel.fromObj(contract.toJS())
    }).not.toThrow()
  })
})
