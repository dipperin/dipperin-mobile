import React from 'react'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationScreenProp } from 'react-navigation'
import SystomStore from 'Store/System'
import WalletStore from 'Store/wallet'

interface Props {
  wallet?: WalletStore
  system?: SystomStore
  navigation: NavigationScreenProp<any>
}

@inject('system', 'wallet')
@observer
class Splash extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    const { loading } = this.props.system!
    this.checkLoading(loading)
    reaction(
      () => this.props.system!.loading,
      loading => {
        this.checkLoading(loading)
      }
    )
  }

  checkLoading = (loading: boolean) => {
    if(!loading) {
      SplashScreen.hide() // hide splash page
      const { isHaveWallet } = this.props.wallet!
      // this.props.navigation.navigate(isHaveWallet ? 'wallet' : 'lock')
      this.props.navigation.navigate('lock')
    }
  }
  render() {
    return (
      <View />
    )
  }
}

export default Splash


