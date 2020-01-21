import React from 'react'
import i18n from 'I18n'
import { View, StyleProp, TextStyle, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { defaultTabBarOptions } from './utils'

// Components
import CustomBack from './CustomBack'
import CustomIcon from './CustomIcon'
import { Icon } from 'Components/Icon'
import ShareIcon from './Share'

// about wallet
import Start from 'Pages/InitWallet/Start'
import Import from 'Pages/InitWallet/Import'
import Create from 'Pages/InitWallet/Create'
import CreateStep1 from 'Pages/InitWallet/Create/CreateStep1'
import CreateStep2 from 'Pages/InitWallet/Create/CreateStep2'
import CreateStep3 from 'Pages/InitWallet/Create/CreateStep3'

//about acount
import Assets from 'Pages/Accounts/AssetsIndex'
import AddAccount from 'Pages/Accounts/AddAccount'
import AccountDetail from 'Pages/Accounts/AccountDetail'
import TransactionDetail from 'Pages/Accounts/TransactionDetail'
import ScanScreen from 'Pages/Accounts/ScanScreen'
import Send from 'Pages/Transaction/Send'
import Receive from 'Pages/Transaction/Receive'
import Shortword from 'Pages/Transaction/Shortword'

// discovery
import Discovery from 'Pages/Discovery'

//setting
import Me from 'Pages/Me'
import Settings from 'Pages/Me/Settings'
import AboutUs from 'Pages/Me/AboutUs'
import HelpCenter from 'Pages/Me/HelpCenter'
import ChangePassword from 'Pages/Me/Settings/ChangePassword'
import ToggleLanguage from 'Pages/Me/Settings/ToggleLanguage'
import NodeChoose from 'Pages/Me/Settings/NodeChoose'

import HelpCenterDetail from 'Pages/Me/HelpCenter/HelpCenterDetail'
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
  headerTitleStyle: defaultHeaderTitleStyle,
}

const headerBackConfigNoBorder = {
  ...commonHeaderBack,
  headerStyle: commonHeaderStyle,
  headerTitleStyle: defaultHeaderTitleStyle,
}

export const initWalletStack = createStackNavigator({
  start: {
    screen: Start,
    navigationOptions: () => ({
      header: null,
    }),
  },
  import: {
    screen: Import,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: i18n.t('dipperin:import.title'),
    }),
  },
  create: {
    screen: Create,
    navigationOptions: () => ({
      ...headerBackConfig,
    }),
  },
  createStep1: {
    screen: CreateStep1,
    navigationOptions: () => ({
      ...headerBackConfig,
    }),
  },
  createStep2: {
    screen: CreateStep2,
    navigationOptions: () => ({
      ...headerBackConfig,
    }),
  },
  createStep3: {
    screen: CreateStep3,
    navigationOptions: () => ({
      ...headerBackConfig,
    }),
  },
  initUserProtocol: {
    screen: UserProtocol,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: i18n.t('dipperin:userProtocol'),
    }),
  },
})

export const walletStack = createStackNavigator({
  Assets: {
    screen: Assets,
    navigationOptions: props => ({
      headerLeft: <View />,
      headerRight: (
        <CustomIcon
          onPress={() => {
            props.navigation.navigate('AddAccount')
          }}>
          <Icon name={'icon|tianjia'} size={25} color="#fff" />
        </CustomIcon>
      ),
      headerStyle: { ...commonHeaderStyle, backgroundColor: '#275DA5' },
      headerTitleStyle: { ...defaultHeaderTitleStyle, color: '#fff' },
      title: props.navigation.getParam('title'),
    }),
  },
  AddAccount: {
    screen: AddAccount,
    navigationOptions: props => ({
      ...headerBackConfig,
      title: i18n.t('dipperin:account.addAcount'),
      headerRight: (
        <CustomIcon onPress={props.navigation.getParam('addAccount')}>
          <Text style={{color:'#1C77BC'}}>{i18n.t('dipperin:account.buttonPositive')}</Text>
        </CustomIcon>
      ),
    }),
  },
  accountDetail: {
    screen: AccountDetail,
    navigationOptions: props => ({
      ...headerBackConfig,
      headerRight: (
        <CustomIcon
          onPress={() => {
            props.navigation.navigate('ScanScreen')
          }}>
          <Icon name={'icon|saoma'} size={20} color="#393B42" />
        </CustomIcon>
      ),
      title: props.navigation.getParam('title'),
    }),
  },
  send: {
    screen: Send,
    navigationOptions: props => ({
      title: i18n.t('dipperin:transaction.transaction'),
      ...headerBackConfig,
      headerRight: (
        <CustomIcon
          onPress={() => {
            props.navigation.navigate('ScanScreen')
          }}>
          <Icon name={'icon|saoma'} size={20} color="#393B42" />
        </CustomIcon>
      ),
    }),
  },
  TransactionDetail: {
    screen: TransactionDetail,
    navigationOptions: () => ({
      ...headerBackConfig,
      title: i18n.t('dipperin:account.record'),
    }),
  },
  receive: {
    screen: Receive,
    navigationOptions: () => ({
      title: i18n.t('dipperin:transaction.receive'),
      headerLeft: (
        <CustomBack
          content={<Icon name={'icon|fanhui'} size={25} color="#fff" />}
        />
      ),
      headerStyle: {
        ...commonHeaderStyle,
        borderBottomColor: '#1C77BC',
        borderBottomWidth: 1,
        backgroundColor: '#1C77BC',
      },
      headerTitleStyle: {
        color: '#fff',
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerRight: <ShareIcon />,
    }),
  },
  shortword: {
    screen: Shortword,
    navigationOptions: () => ({
      title: i18n.t('dipperin:transaction.shortWordReceive'),
      ...headerBackConfig,
    }),
  },
  ScanScreen: {
    screen: ScanScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
})

export const discoveryStack = createStackNavigator({
  discovery: {
    screen: Discovery,
    navigationOptions: () => ({
      ...headerBackConfig,
      headerLeft: null,
      title: i18n.t('dipperin:discovery.title'),
      headerTitleStyle: {
        width: '100%',
        color: '#3C3E42',
        textAlign: 'center',
      },
    }),
  },
})

export const meStack = createStackNavigator(
  {
    me: {
      screen: Me,
      navigationOptions: () => ({
        header: null,
      }),
    },
    settings: {
      screen: Settings,
      navigationOptions: () => ({
        ...headerBackConfig,
        title: i18n.t('dipperin:me.setting'),
      }),
    },
    changePassword: {
      screen: ChangePassword,
      navigationOptions: () => ({
        ...headerBackConfig,
        title: i18n.t('dipperin:me.changePassword'),
      }),
    },
    toggleLanguage: {
      screen: ToggleLanguage,
      navigationOptions: () => ({
        ...headerBackConfig,
        title: i18n.t('dipperin:me.language'),
      }),
    },
    nodeChoose: {
      screen: NodeChoose,
      navigationOptions: () => ({
        ...headerBackConfig,
        title: i18n.t('dipperin:me.nodeChoose'),
      }),
    },
    aboutUs: {
      screen: AboutUs,
      navigationOptions: () => ({ ...headerBackConfigNoBorder }),
    },
    userProtocol: {
      screen: UserProtocol,
      navigationOptions: () => ({
        ...headerBackConfig,
        title: i18n.t('dipperin:userProtocol'),
      }),
    },
    helpCenter: {
      screen: HelpCenter,
      navigationOptions: () => ({
        ...headerBackConfig,
        title: i18n.t('dipperin:me.helpCenter'),
      }),
    },
    helpCenterDetail: {
      screen: HelpCenterDetail,
      navigationOptions: () => ({
        title: i18n.t('dipperin:me.helpCenterDetails'),
        ...headerBackConfig,
      }),
    },
  },
  {
    navigationOptions: defaultTabBarOptions,
  },
)

// hide tab
export const hideTab = ({ navigation }: any) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
    return {
      tabBarVisible,
    }
  }
}
meStack.navigationOptions = hideTab
discoveryStack.navigationOptions = hideTab
walletStack.navigationOptions = hideTab
