import WalletStore from './wallet'

class Root {
  wallet: WalletStore
  constructor() {
    this.wallet = new WalletStore()
  }
}

export default Root