import React, { useEffect } from 'react'
import {
  StyleSheet,
  StatusBar,
  Linking,
  AppState,
  NativeModules,
  AppStateStatus
} from 'react-native'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { I18nextProvider } from 'react-i18next'
import SplashScreen from 'react-native-splash-screen'


import './ global' // for nodejs modules
import Router from 'Router'
import i18n from 'I18n'
import RootStore from 'Store/root'
import NavigationService from 'Router/navigationService'
import { isToTransferUrl } from 'Global/utils'
import { getParamsFromLinkUrl } from 'Global/utils'
import navigationService from 'Router/navigationService'

// Configure mobx
configure({
  enforceActions: 'observed'
})

const rootStore = new RootStore()

const App = () => {
  const onLinkUrlChange = ({ url }: { url: string }) => {
    console.log('change', url)
    if (url) {
      linkNavigate(url)
    }
  }

  const onAppStateChange = (appState: AppStateStatus) => {
    if (appState == 'active') {
      Linking.getInitialURL().then(url => {
        NativeModules.linkingModule.resetURL()
        console.log('init', url)
        if (url) {
          linkNavigate(url)
        }
      })
    }
  }

  const linkNavigate = (url: string) => {
    try {
      if (!isToTransferUrl(url)) {
        return
      }
      const address = getParamsFromLinkUrl('address', url)
      const amount = getParamsFromLinkUrl('amount', url)
      const scheme = getParamsFromLinkUrl('scheme', url)
      if (address) {
        navigationService.navigate('lock', { address, amount, scheme, type: 'send' })
      }
    } catch (_) {

    }
  }

  useEffect(() => {
    Linking.addEventListener('url', onLinkUrlChange)
    AppState.addEventListener('change', onAppStateChange)
    return () => {
      Linking.removeEventListener('url', onLinkUrlChange)
      AppState.removeEventListener('change', onAppStateChange)
    }
  })

  return (
    <I18nextProvider i18n={i18n}>
      <Provider {...rootStore}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Router ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef!);
        }} />
      </Provider>
    </I18nextProvider>
  )
}

const styles = StyleSheet.create({

})

export default App
