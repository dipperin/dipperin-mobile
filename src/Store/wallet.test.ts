import _ from 'lodash'
import RootStore from './root'
import WalletStore from './wallet'
import { ACCOUNTS_PATH } from 'Global/constants'

describe('wallet store, create new wallet', () => {
  let wallet: WalletStore
  const root = new RootStore()

  it('construct', () => {
    expect(() => {
      wallet = new WalletStore(root)
    }).not.toThrow()
  })

  it('toggleLock, before load', () => {
    expect(() => {
      wallet.toggleLock(true)
    }).toThrow()
  })

  it('getPrivateKeyBypath, before load', () => {
    expect(() => {
      wallet.getAccountByPath(`${ACCOUNTS_PATH}/1`)
    }).toThrow()
  })

  it('unlockWallet, before load', async () => {
    expect(() => {
      wallet.unlockWallet('12345678')
    }).not.toThrow()
    expect(await wallet.unlockWallet('12345678')).toBe(false)
    expect(wallet.unlockErrTimes).toBe(0)
  })

  it('checkPassword, before load', async () => {
    expect(() => {
      wallet.checkPassword('12345678')
    }).not.toThrow()
    expect(await wallet.unlockWallet('12345678')).toBe(false)
    expect(wallet.unlockErrTimes).toBe(0)
  })


  it('create with mnemonic',async () => {
    await wallet.create('12345678', 'unusual drastic patrol mansion fuel more obey acquire disagree head trip chat')
    expect(wallet.isHaveWallet).toBe(true)
    expect(wallet.isUnlock).toBe(true)
  })

  it('toggleLock', () => {
    wallet.toggleLock(true)
    expect(wallet.showLock).toBe(true)
  })

  it('getPrivateKeyBypath', () => {
    expect(wallet.getPrivateKeyByPath(`${ACCOUNTS_PATH}/1`)).toEqual(
      '0x1b2309e66874ea6bd35b7c7c6613b9c43a003076e273ce0dc8e36961a6d2877a'
    )
  })

  it('unlockWallet, error password', async () => {
    await wallet.unlockWallet('1')
    expect(wallet.unlockErrTimes).toBe(1)
  })

  it('unlockWallet', async () => {
    await wallet.unlockWallet('12345678')
    expect(wallet.unlockErrTimes).toBe(0)
  })

  it('unlockWallet, wrong too many times', async () => {
    await Promise.all(_.range(8).map(() => {
      wallet.unlockWallet('1')
    }))
    expect(wallet.showLock).toBe(true)
    expect(wallet.unlockErrTimes).toBe(0)
  })
})

// describe('walletStore, load wallet', () => {
//   let wallet: WalletStore
//   const root = new RootStore()
//   it('construct', () => {
//     expect(() => {
//       wallet = new WalletStore(root)
//     }).not.toThrow()
//   })

  // it('load', async () => {
  //   await wallet.load()
  //   expect(wallet.isHaveWallet).toBe(true)
  //   expect(wallet.isUnlock).toBe(false)
  // })

  // it('unlockWallet', async () => {
  //   wallet.unlockWallet('12345678')
  //   expect(wallet.isUnlock).toBe(true)
  // })
// })

// describe('walletStore, import wallet', () => {
//   let wallet: WalletStore
//   const root = new RootStore()
//   it('construct', () => {
//     expect(() => {
//       wallet = new WalletStore(root)
//       root.wallet = wallet
//     }).not.toThrow()
//   })

  // it('create, without mnemonic', () => {
  //   wallet.create('12345678')
  //   wallet.destroyMnemonic!()
  //   expect(wallet.isHaveWallet).toBe(true)
  //   expect(wallet.isUnlock).toBe(true)
  // })

  // it('unlockWallet', () => {
  //   wallet.unlockWallet('12345678')
  //   expect(wallet.isUnlock).toBe(true)
  // })
// })
