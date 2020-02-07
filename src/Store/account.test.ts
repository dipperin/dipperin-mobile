import AccountStore from './account'
import mockRootBuilder from 'tests/mocks/root'
import { Utils ,Accounts} from '@dipperin/dipperin.js'
import AccountModel from 'Models/account'
import * as Db from 'Db'

describe('stores/account', () => {
    const root = mockRootBuilder(true)
    let account: AccountStore = new AccountStore(root)

    it('constructor', () => {
        expect(() => {
            account = new AccountStore(root)
        }).not.toThrow()
    })

    it('load', async () => {
        await account.load()
        expect(account.accounts.length).toBe(6)
        expect(account.accountMap.size).toBe(6)
    })
    it('startUpdate', () => {
        const updateAccountsBalance = jest.spyOn(account, 'updateAccountsBalance')
        const updateAddressLockMoney = jest.spyOn(account, 'updateAddressLockMoney')
        const updateAccountsNonce = jest.spyOn(account, 'updateAccountsNonce')
        account.startUpdate()
        expect(updateAccountsBalance).toBeCalled()
        expect(updateAddressLockMoney).toBeCalled()
        expect(updateAccountsNonce).toBeCalled()
    })
    it('initAccount', async () => {
        const addAccount = jest.spyOn(account, 'addAccount')
        await account.initAccount()
        expect(addAccount).toBeCalledWith('', '1')
    })
    it('removeAccountAsync', async () => {
        const removeAccount = jest.spyOn(Db, 'removeAccount')
        await account.removeAccountAsync('1')
        expect(removeAccount).toBeCalled()

    })
    it('updateAccount',async()=>{
        const newAccount = new AccountModel('8','0x123','0xss','name')
        const updateSingleAccount = jest.spyOn(Db, 'updateSingleAccount')
        await account.updateAccount(newAccount)
        expect(updateSingleAccount).toBeCalledWith(newAccount.toJS())
    })
    it('importPrivateKey',async()=>{
        Accounts.encrypt = jest.fn()
        const updateAccountsBalance = jest.spyOn(account, 'updateAccountsBalance')
        const changeActiveAccount = jest.spyOn(account, 'changeActiveAccount')
        const updateAccountsNonce = jest.spyOn(account, 'updateAccountsNonce')
        await account.importPrivateKey('0x0f6c19be4fcb282b6f92df0ee6c68e9efd5b961d4fbcd3cb7aaec976872ad718')
        expect(updateAccountsBalance).toBeCalled()
        expect(changeActiveAccount).toBeCalled()
        expect(updateAccountsNonce).toBeCalled()
    })
    it('addAccount, No error is thrown when the wallet has been loaded and unlocked.', async () => {
        expect.assertions(2)
        await root.initWallet()
        account.addAccount('', '1')
        expect(account.accounts.length).toBe(7)
        expect(account.accountMap.size).toBe(7)
    })

    it('changeActiveAccount', () => {
        account.changeActiveAccount(account.accounts[1].id)
        expect(account.activeAccount).toEqual(account.accounts[1])
    })
    it('updateAccountsBalance', async () => {
        root.dipperin!.dr.getBalance = jest.fn(async () => Utils.toUnit('10000'))
        await account.updateAccountsBalance(account.accounts[0].id)
        expect(account.accounts[0].balanceUnit).toBe(Utils.toUnit('10000'))
        await account.updateAccountsBalance()
        account.accounts.forEach(acc => {
            expect(acc.balanceUnit).toEqual(Utils.toUnit('10000'))
        })
    })

    it('updateAccountsNonce', async () => {
        root.dipperin!.dr.getNonce = jest.fn(async () => '12')
        await account.updateAccountsNonce(account.accounts[0].id)
        expect(account.accounts[0].nonce).toEqual('12')

        await account.updateAccountsNonce()
        account.accounts.forEach(acc => {
            expect(acc.nonce).toEqual('12')
        })
    })
    it('updateAddressLockMoney',async()=>{
        root.dipperin!.dr.getLockedMoney = jest.fn().mockResolvedValue('2000000000')
        await account.updateAddressLockMoney(account.accounts[0].id)
        expect(account.accounts[0].lockMoney).toEqual('0.000000002')


        await account.updateAddressLockMoney()
        account.accounts.forEach(acc => {
            expect(acc.lockMoney).toEqual('0.000000002')
        })
    })
    it('clear',()=>{
        account.clear()
        expect(account.accounts.length).toBe(0)
    }
    )
})
