import React from 'react'
import {
  StyleSheet,
  StatusBar,
} from 'react-native'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { I18nextProvider } from 'react-i18next'

import './ global' // for nodejs modules
import Router from 'Router'
import i18n from 'I18n'
import RootStore from 'Store/root'
import NavigationService from 'Router/navigationService'

// Configure mobx
configure({
  enforceActions: 'observed'
})

const rootStore = new RootStore()

const App = () => {
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

export default App
