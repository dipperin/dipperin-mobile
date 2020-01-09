import React from 'react'
import i18n from 'I18n';
import { View, StyleProp, TextStyle ,Text} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { defaultTabBarOptions } from './utils'

// Components
import CustomBack from './CustomBack'
import CustomIcon from "./CustomIcon"
import { Icon } from 'Components/Icon'

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
import Send from 'Pages/Transaction/Send'
import Receive from 'Pages/Transaction/Receive'
import Shortword from 'Pages/Transaction/Shortword'

// discovery
import Discovery from 'Pages/Discovery';

//setting
import Me from 'Pages/Me'
import Settings from 'Pages/Me/Settings'
import AboutUs from 'Pages/Me/AboutUs'
import HelpCenter from 'Pages/Me/HelpCenter'
import ChangePassword from 'Pages/Me/Settings/ChangePassword'
import ToggleLanguage from 'Pages/Me/Settings/ToggleLanguage'
import NodeChoose from 'Pages/Me/Settings/NodeChoose'




import HelpCenterDetail from 'Pages/Me/HelpCenter/HelpCenterDetail'
import FunctionIntr from 'Pages/Me/AboutUs/FunctionIntr'
import UserProtocol from 'Pages/Me/AboutUs/UserProtocol'

export const commonHeaderStyle = {
  shadowOpacity: 0,
  elevation: 0,
  borderBottomWidth: 0,
};

const commonHeaderBack = {
  headerLeft: <CustomBack />,
  headerRight: <View />,
};

// default headerTitle style
const defaultHeaderTitleStyle: StyleProp<TextStyle> = {
  flex: 1,
  alignSelf: 'center',
  textAlign: 'center',
  color: '#333',
  fontSize: 18,
  fontWeight: 'bold',
};

const headerBackConfig = {
  ...commonHeaderBack,
  headerStyle: {
    ...commonHeaderStyle,
    borderBottomColor: '#e5e5e6',
    borderBottomWidth: 1,
  },
  headerTitleStyle: defaultHeaderTitleStyle,
};

const headerBackConfigNoBorder = {
  ...commonHeaderBack,
  headerStyle: commonHeaderStyle,
  headerTitleStyle: defaultHeaderTitleStyle,
};

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
      title: i18n.t('dipperin:import.title')
    })
  },
  create: {
    screen: Create,
    navigationOptions: () => ({
      ...headerBackConfig
    })
  },
  createStep1: {
    screen: CreateStep1,
    navigationOptions: () => ({
      ...headerBackConfig
    })
  },
  createStep2: {
    screen: CreateStep2,
    navigationOptions: () => ({
      ...headerBackConfig
    })
  },
  createStep3: {
    screen: CreateStep3,
    navigationOptions: () => ({
      ...headerBackConfig
    })
  },
})

export const walletStack = createStackNavigator({
  Assets: {
    screen: Assets,
    navigationOptions: (props) => ({
      headerLeft:<View/>,
      headerRight:<CustomIcon onPress={()=>{props.navigation.navigate('AddAccount')}}><Icon name={'icon|tianjia'} size={25} color="#fff" /></CustomIcon>,
      headerStyle:{...commonHeaderStyle,backgroundColor: '#275DA5'},
      headerTitleStyle:{...defaultHeaderTitleStyle,color:"#fff"},
      title:'Wallet'
    })
  },
  AddAccount:{
    screen:AddAccount,
    navigationOptions:(props) => ({
      ...headerBackConfig,
      title: 'Add Account',
      headerRight:<CustomIcon onPress={props.navigation.getParam('addAccount')}><Text>确定</Text></CustomIcon>
    })
  },
  accountDetail:{
    screen:AccountDetail,
    navigationOptions:(props) => ({
      ...headerBackConfig,
      headerRight:<CustomIcon onPress={()=>{props.navigation.navigate('Scan')}}><Icon name={'icon|saoma'} size={20} color="##393B42"/></CustomIcon>,
      title: 'Dip'
    })
  },
  send: {
    screen: Send,
    navigationOptions: (props) => ({
      title: i18n.t('dipperin:transaction.transaction'),
      headerRight:<CustomIcon onPress={()=>{props.navigation.navigate('accountDetail')}}><Icon name={'icon|saoma'} size={20} color="##393B42"/></CustomIcon>,
      ...headerBackConfig,
    }),
  },
  receive: {
    screen: Receive,
    navigationOptions: () => ({
      title: i18n.t('dipperin:transaction.receive'),
      ...headerBackConfig,
    }),
  },
  shortword: {
    screen: Shortword,
    navigationOptions: () => ({
      title: i18n.t('dipperin:transaction.shortWordReceive'),
      ...headerBackConfig,
    }),
  },
});

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


