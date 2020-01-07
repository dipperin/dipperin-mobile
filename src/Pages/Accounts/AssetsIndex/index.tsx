import React, {  useEffect } from 'react'
import { View, Text, Button, StatusBar, Platform } from 'react-native'
import {NavigationEvents } from "react-navigation"
import AssetsInfo from "./AssetsInfo"
import AccountList from "./AccountList"




const Assets = () => {

  function didFocus() {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#275DA5')
  }
  function didBlur() {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff')
  }
  return (
    <View style={{flex:1}}>
      <NavigationEvents
        onDidFocus={didFocus}
        onDidBlur={didBlur}
      />
      <AssetsInfo />
      <AccountList />
    </View>

  )
}

export default Assets

