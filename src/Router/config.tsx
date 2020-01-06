import React from 'react'
import { View, StyleProp, TextStyle } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import {defaultTabBarOptions} from './utils'
import CustomBack from './CustomBack'

import Start from 'Pages/InitWallet/Start'
import Assets from 'Pages/Accounts/AssetsIndex'
import Apps from 'Pages/Discovery/Apps'
import Me from 'Pages/Me'
import Settings from 'Pages/Me/Settings'
import AboutUs from 'Pages/Me/AboutUs'
import HelpCenter from 'Pages/Me/HelpCenter'
import ChangePassword from 'Pages/Me/Settings/ChangePassword'
import ToggleLanguage from 'Pages/Me/Settings/ToggleLanguage'
import NodeChoose from 'Pages/Me/Settings/NodeChoose'

export const commonHeaderStyle = {
  shadowOpacity: 0,
  elevation: 0,
  borderBottomWidth: 0,
}

const commonHeaderBack = {
  headerLeft: <CustomBack />,
  headerRight: <View />,
}

// default headerTitle style
const defaultHeaderTitleStyle: StyleProp<TextStyle> = {
  flex: 1,
  alignSelf: 'center',
  textAlign: 'center',
  color: '#333',
  fontSize: 18,
  fontWeight: 'bold',
}

const headerBackConfig = {
  ...commonHeaderBack,
  headerStyle: {
    ...commonHeaderStyle,
    borderBottomColor: '#e5e5e6',
    borderBottomWidth: 1,
  },
  headerTitleStyle: defaultHeaderTitleStyle
}

export const initWalletStack = createStackNavigator({
  start: {
    screen: Start,
    navigationOptions: () => ({
      header: null
    })
  }
})

export const walletStack = createStackNavigator({
  Assets: {
    screen: Assets,
    navigationOptions: () => ({
      headerRight:<CustomBack />,
      headerStyle:{commonHeaderStyle,backgroundColor: '#275DA5'},
      headerTitleStyle:defaultHeaderTitleStyle,
      title:'Wallet'
    })
  }
})

export const discoveryStack = createStackNavigator({
  apps: {
    screen: Apps,
    navigationOptions: () => ({
      header: null
    })
  }
})

export const meStack = createStackNavigator({
  me: {
    screen: Me,
    navigationOptions: () => ({
      header: null
    })
  },
  settings: {
    screen: Settings,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '设置'
    })
  },
  changePassword: {
    screen: ChangePassword,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '修改密码'
    })
  },
  toggleLanguage: {
    screen: ToggleLanguage,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '语言切换'
    })
  },
  nodeChoose: {
    screen: NodeChoose,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '节点选择'
    })
  },
  aboutUs: {
    screen: AboutUs,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '关于我们'
    })
  },
  helpCenter: {
    screen: HelpCenter,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '帮助中心'
    })
  }
}, {
  navigationOptions: defaultTabBarOptions
})


