import React from 'react'
import { View, StyleProp, TextStyle } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { defaultTabBarOptions } from './utils'
import CustomBack from './CustomBack'

import Start from 'Pages/InitWallet/Start'
import Accounts from 'Pages/Accounts'
import Me from 'Pages/Me'
import Discovery from 'Pages/Discovery'
import Settings from 'Pages/Me/Settings'
import AboutUs from 'Pages/Me/AboutUs'
import HelpCenter from 'Pages/Me/HelpCenter'
import ChangePassword from 'Pages/Me/Settings/ChangePassword'
import ToggleLanguage from 'Pages/Me/Settings/ToggleLanguage'
import NodeChoose from 'Pages/Me/Settings/NodeChoose'
import Import from 'Pages/InitWallet/Import'

import i18n from 'I18n'

import HelpCenterDetail from 'Pages/Me/HelpCenter/HelpCenterDetail'
import FunctionIntr from 'Pages/Me/AboutUs/FunctionIntr'
import UserProtocol from 'Pages/Me/AboutUs/UserProtocol'

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

const headerBackConfigNoBorder = {
  ...commonHeaderBack,
  headerStyle: commonHeaderStyle,
  headerTitleStyle: defaultHeaderTitleStyle
}

export const initWalletStack = createStackNavigator({
  start: {
    screen: Start,
    navigationOptions: () => ({
      header: null
    })
  },
  import: {
    screen: Import,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: i18n.t('dipperin:start.import')
    })
  }
})

export const walletStack = createStackNavigator({
  accounts: {
    screen: Accounts,
    navigationOptions: () => ({
      header: null
    })
  }
})

export const discoveryStack = createStackNavigator({
  discovery: {
    screen: Discovery,
    navigationOptions: () => ({
      ...headerBackConfig,
      headerLeft: null,
      title: i18n.t('dipperin:discovery.title'),
      headerStyle:{
        backgroundColor: '#0B0E19',
      },
      headerTitleStyle: {
        width: '100%',
        color: '#ffffff',
        textAlign: 'center'
      }
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
      header: null
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
    navigationOptions: () => ({...headerBackConfigNoBorder})
  },
  functionIntr: {
    screen: FunctionIntr,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '功能介绍'
    })
  },
  userProtocol: {
    screen: UserProtocol,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '用户协议'
    })
  },
  helpCenter: {
    screen: HelpCenter,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: '帮助中心'
    })
  },
  helpCenterDetail: {
    screen: HelpCenterDetail,
    navigationOptions: () => ({
      title: '帮助中心详情',
      ...headerBackConfig
    })
  }
}, {
  navigationOptions: defaultTabBarOptions
})


