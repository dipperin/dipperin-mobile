import Account from './account'
import mockAccountData from '@/tests/testData/accounts'
import { Utils } from '@dipperin/dipperin.js'

describe('models/account', () => {
  it('constructor', () => {
    expect(() => {
      mockAccountData.forEach(accountData => {
        Account.fromObj(accountData)
      })
    }).not.toThrow()
  })

  it('updateBalance', () => {
    const account = new Account('1', 'path', 'address', '')
    account.updateBalance(Utils.toUnit('10000'))
    expect(account.balance).toEqual('10000')
    expect(account.balanceUnit).toEqual(Utils.toUnit('10000'))
  })

  it('updateNonce', () => {
    const account = new Account('1', 'path', 'address', '')
    account.updateNonce('100')
    expect(account.nonce).toEqual('100')
  })

  it('updateNonce', () => {
    const account = new Account('1', 'path', 'address', '')
    account.updateNonce('100')
    account.plusNonce()
    expect(account.nonce).toEqual('101')
  })

  it('toJS', () => {
    const account = new Account('1', 'path', 'address', '')
    expect(account.toJS()).toEqual({
      address: 'address',
      id: 1,
      path: 'path',
      nonce: '0',
      name: '',
      opt: {}
    })
  })
})
