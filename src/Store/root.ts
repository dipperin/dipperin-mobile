import { reaction } from 'mobx'
import WalletStore from './wallet'
import Dipperin from '@dipperin/dipperin.js'
import Account from './account'
import ChainData from './chainData'
import Transaction from './transaction'
import Timer from './timer'
import System from './System'
import Discovery from './discovery'

class Root {
  timer: Timer
  chainData: ChainData
  wallet: WalletStore
  account: Account
  transaction: Transaction
  system: System
  dipperin?: Dipperin
  discovery: Discovery
  constructor() {
    this.timer = new Timer()
    this.chainData = new ChainData(this)
    this.wallet = new WalletStore(this)
    this.account = new Account(this)
    this.transaction = new Transaction(this)
    this.system = new System()
    this.discovery = new Discovery()
    this.init()
  }

  async init() {
    try {
      await this.chainData.init()
      this.dipperin = new Dipperin(this.chainData.currentNetHost) 
      await this.wallet.load() 
      await this.account.load()
      await this.transaction.load()
      await this.system.init()
      this.chainData.startUpdate()
      reaction(
        () => this.chainData.isConnect, // once connected, update trasction & account
        isConnect => {
          if (isConnect) {
            this.account.startUpdate()
            this.transaction.startUpdate()
          } 
        }
      )
    }catch(err) {
      console.log(err)
    } finally {
      this.system.setLoading(false)
    }
    
  }

  updateDipperinHost() {
    this.dipperin = new Dipperin(this.chainData.currentNetHost)
  }
}

export default Root