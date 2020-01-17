import React from 'react'
import { reaction, observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { View, AppState, Linking, NativeModules } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationScreenProp } from 'react-navigation'
import SystomStore from 'Store/System'
import WalletStore from 'Store/wallet'
import { isToTransferUrl, getParamsFromLinkUrl } from 'Global/utils'

type OpenType = '' | 'send'

interface Props {
  wallet?: WalletStore
  system?: SystomStore
  navigation: NavigationScreenProp<any>
}

@inject('system', 'wallet')
@observer
class Splash extends React.Component<Props> {
  @observable openType: OpenType = ''
  @observable address: string = ''
  @observable amount: string = ''
  @observable scheme: string = ''
  constructor(props: Props) {
    super(props)
    const { loading } = this.props.system!
    this.checkLoading(loading)
    reaction(
      () => this.props.system!.loading,
      loading => {
        this.checkLoading(loading)
      },
    )

    Linking.addEventListener('url', this.handleLinkUrlChange)
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  // link url change cb
  handleLinkUrlChange = ({ url }: { url: string }) => {
    if (isToTransferUrl(url)) {
      this.sendRedirect(url)
    }
  }

  // app state change cb
  handleAppStateChange = (status: string) => {
    if (status === 'active') {
      Linking.getInitialURL().then(url => {
        NativeModules.linkingModule.resetURL()
        if (isToTransferUrl(url)) {
          this.sendRedirect(url as string)
          return
        }
        const { loading } = this.props.system!
        this.checkLoading(loading)
      })
    }
  }

  // redirect to send page
  @action
  sendRedirect = (url: string) => {
    const address = getParamsFromLinkUrl('address', url)
    const amount = getParamsFromLinkUrl('amount', url)
    const scheme = getParamsFromLinkUrl('scheme', url)
    this.address = address || ''
    this.amount = amount || ''
    this.scheme = scheme || ''
    this.openType = 'send'
    this.checkLoading(this.props.system!.loading)
  }

  // checkLoading && redirect
  checkLoading = (loading: boolean) => {
    if (!loading) {
      SplashScreen.hide() // hide splash page
      const { isHaveWallet } = this.props.wallet!
      if (isHaveWallet) {
        if (this.openType === 'send') {
          this.props.navigation.navigate('lock', {
            address: this.address,
            amount: this.amount,
            scheme: this.scheme,
            type: 'send',
          })
          this.resetOpenParams()
          return
        }
        this.props.navigation.navigate('lock')
        return
      }
      this.props.navigation.navigate('start')
    }
  }

  resetOpenParams = () => {
    this.address = ''
    this.amount = ''
    this.scheme = ''
    this.openType = ''
  }

  render() {
    return <View />
  }
}

export default Splash
