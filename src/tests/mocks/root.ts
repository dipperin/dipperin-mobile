// import 'i18next'
// jest.mock('i18next')
import Account from 'Store/account'
import Root from 'Store/root'
import Timer from 'Store/timer'
import Transaction from 'Store/transaction'
import Wallet from 'Store/wallet'
import ChainData from 'Store/chainData'
import Contract from 'Store/contract'
import System from 'Store/System'
import Discovery from 'Store/discovery'


import mockDipperinBuilder from './dipperin'

jest.mock('Store/timer', () => {
  return class Timer {
      async on(name: string, method: () => void, interval: number) {
          await method()
      }
      clear() {}
  }
})
interface MockRoot extends Root {
  initWallet: (autoInit?: boolean) => Promise<void>
}

const mockRootBuilder = (autoInit?: boolean): MockRoot => {
  const dipperin = mockDipperinBuilder()

  const mockRoot = new Root() as MockRoot

  const mockTimer = new Timer()

  const mockWallet = new Wallet(mockRoot)

  const mockAccount = new Account(mockRoot)

  const mockTransaction = new Transaction(mockRoot)

  const mockChainData = new ChainData(mockRoot)

  const mockContract = new Contract(mockRoot)

  const mockSystem = new System(mockRoot)

  const mockDiscovery = new Discovery()

  mockRoot.dipperin = dipperin
  mockRoot.timer = mockTimer
  mockRoot.wallet = mockWallet
  mockRoot.account = mockAccount
  mockRoot.transaction = mockTransaction
  mockRoot.chainData = mockChainData
  mockRoot.contract = mockContract
  mockRoot.system = mockSystem
  mockRoot.discovery = mockDiscovery

  const initWallet = async () => {
    // Load Wallet
    await mockRoot.init()

    // Unlock Wallet
    await mockWallet.unlockWallet('12345678')

    await mockAccount.load()
    await mockAccount.initAccount()

    // Update account balance
    await mockAccount.updateAccountsBalance()
  }

  mockRoot.initWallet = initWallet

  if (autoInit) {
    initWallet()
  }

  return mockRoot
}

// initWallet()

export default mockRootBuilder
