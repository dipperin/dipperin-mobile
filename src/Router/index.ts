import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { walletStack, discoveryStack, meStack, initWalletStack } from './config'
import { getTabNavigationOptions } from './utils'
import Splash from 'Pages/InitWallet/SplashPage'

const walletTabs = createBottomTabNavigator({
  wallet: {
    screen: walletStack,
  },
  discovery: {
    screen: discoveryStack,
  },
  me: {
    screen: meStack,
  }
},
  {
    defaultNavigationOptions: navigateInfo => getTabNavigationOptions(navigateInfo)
  }
)

const switchNavigator = createSwitchNavigator({
  wallet: walletTabs,
  splash: Splash,
  init: initWalletStack,
})

export default createAppContainer(switchNavigator)