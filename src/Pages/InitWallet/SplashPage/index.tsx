import React from 'react'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { View, AppState } from 'react-native'
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
      this.props.navigation.navigate(isHaveWallet ? 'lock' : 'start')
      // this.props.navigation.navigate('Assets')
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (status: string) => {
    if(status === 'active') {
      const { loading } = this.props.system!
      this.checkLoading(loading)
    }
  }

  render() {
    return (
      <View />
    )
  }
}

export default Splash


