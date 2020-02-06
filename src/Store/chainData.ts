import { NET, NET_HOST, STORAGE_KEYS } from 'Global/constants'
import RootStore from './root'
import { observable, computed, action } from 'mobx'
import { getStorage } from 'Db';
class ChainData {
  @observable private _currentNet: NET = NET.VENUS
  @observable private _isConnect: boolean = false // node is connect
  @observable private _blockInfo: any
  @observable
  private _rootStore: RootStore
  constructor(root: RootStore) {
    this._rootStore = root
  }

  get currentNet(): NET {
    return this._currentNet
  }

  set currentNet(net: NET) {
    this._currentNet = net
  }

  @computed
  get currentNetHost(): string {
    return NET_HOST[this._currentNet]
  }

  get isConnect(): boolean {
    return this._isConnect
  }

  get blockInfo() {
    return this._blockInfo
  }

  async startUpdate() {
    await Promise.all([
      this._rootStore.timer.on('checkConnect', this._checkIsConnect.bind(this), 5000),
      this._rootStore.timer.on('getBlockInfo', this._getCurrentBlock.bind(this), 10000)
    ]) 
  }

  /**
   * get host from storage
   */
  async init() {
      const storageNet = await getStorage(STORAGE_KEYS.NET)
      this.currentNet = storageNet || NET.VENUS
  }

  @action
  changeNet(net: NET) {
    this._rootStore.timer.clear() // clear interval
    this._isConnect = false
    this._currentNet = net
    this._rootStore.updateDipperinHost()
    this.startUpdate() // start checking connect, once connected, update trasction & account 
  }

  @action
  resetBlockInfo() {
    this._blockInfo = undefined
  }

  private _checkIsConnect = async () => {
    try {
      const isConnect = await this._rootStore.dipperin!.net.isConnecting()
      this._changeIsConnect(isConnect)
    } catch(err) {
      console.error('checkIsConnect', err)
      this._changeIsConnect(false)
    }
  }

  @action
  private _changeIsConnect(connect: boolean) {
    this._isConnect = connect
  }

  /**
  * Get current block data
  */
  @action
  private async _getCurrentBlock() { // TODO action in async ?
    const res = await this._rootStore.dipperin!.dr.getCurrentBlock()
    if (res) {
      const blockInfo = {
        ...res.header,
        transactions: res.body.transactions ? res.body.transactions.length : 0
      }
      this._blockInfo = blockInfo
    } else {
      this.resetBlockInfo()
      console.error(`can't get block info`)
    }
  }

}

export default ChainData
