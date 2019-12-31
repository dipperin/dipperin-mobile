import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { walletStack, discoveryStack, meStack, initWalletStack } from './config'
import { getTabNavigationOptions } from './utils'

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
  init: initWalletStack,
})

export default createAppContainer(switchNavigator)