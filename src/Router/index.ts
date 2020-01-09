import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { walletStack, discoveryStack, meStack, initWalletStack } from './config'
import { getTabNavigationOptions } from './utils'
import Splash from 'Pages/InitWallet/SplashPage'
import { createStackNavigator } from 'react-navigation-stack'
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
  }
},
  {
    defaultNavigationOptions: navigateInfo => getTabNavigationOptions(navigateInfo)
  }
)

const homeStack = createStackNavigator({
  lock: {
    screen: LockPage,
    navigationOptions: () => ({
      header: null
    })
  },
  tabs: walletTabs
})

const switchNavigator = createSwitchNavigator({
  splash: Splash,
  wallet: homeStack,
  init: initWalletStack,
})

export default createAppContainer(switchNavigator)