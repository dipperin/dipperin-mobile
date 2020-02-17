import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { walletStack, discoveryStack, meStack, initWalletStack } from './config'
import { getTabNavigationOptions } from './utils'
import Splash from 'Pages/InitWallet/SplashPage'
import LockPage from 'Pages/InitWallet/LockPage'

const walletTabs = createBottomTabNavigator({
  wallet: {
    screen: walletStack,
  },
  discovery: {
    screen: discoveryStack,
  },
  me: {
    screen: meStack,
  },
},
  {
    defaultNavigationOptions: navigateInfo => getTabNavigationOptions(navigateInfo),
  }
)



const switchNavigator = createSwitchNavigator({
  splash: Splash,
  home: walletTabs,
  init: initWalletStack,
  lock: {
    screen: LockPage,
    navigationOptions: () => ({
      header: null,
    }),
  },
})

export default createAppContainer(switchNavigator)
