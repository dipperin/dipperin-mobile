import WalletStore from './wallet'
import System from './System'

class Root {
  wallet: WalletStore
  system: System
  constructor() {
    this.wallet = new WalletStore()
    this.system = new System()
  }
}

export default Root