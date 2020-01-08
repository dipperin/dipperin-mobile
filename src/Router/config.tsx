import React from 'react';
import {View, StyleProp, TextStyle} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import CustomBack from './CustomBack';

import Start from 'Pages/InitWallet/Start';
import Accounts from 'Pages/Accounts';
import Apps from 'Pages/Discovery/Apps';
import Me from 'Pages/Me';
import Send from 'Pages/Send';
import Receive from 'Pages/Receive';
import Shortword from 'Pages/Shortword';

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

export const initWalletStack = createStackNavigator({
  start: {
    screen: Start,
    navigationOptions: () => ({
      header: null,
    }),
  },
  send: {
    screen: Send,
  },
  receive: {
    screen: Receive,
  },
  shortword: {
    screen: Shortword,
  },
});

export const walletStack = createStackNavigator({
  accounts: {
    screen: Accounts,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export const discoveryStack = createStackNavigator({
  apps: {
    screen: Apps,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export const meStack = createStackNavigator({
  me: {
    screen: Me,
    navigationOptions: () => ({
      header: null,
    }),
  },
});
