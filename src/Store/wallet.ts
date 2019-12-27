import { observable } from 'mobx'

class Wallet {
  @observable name: string = 'wallet'
}

export default Wallet