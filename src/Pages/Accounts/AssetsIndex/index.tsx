import React from 'react'
import { inject, observer } from "mobx-react"
import { View, Text, Button, StatusBar, Platform } from 'react-native'
import { NavigationEvents } from "react-navigation"
import AssetsInfo from "./AssetsInfo"
import AccountList from "./AccountList"

import SystemStore from "Store/System"
import AccountStore from "Store/account"

interface Props {
  account: AccountStore
  system: SystemStore
}
@inject('account','system')
@observer
class Assets extends React.Component<Props>{
  didFocus = () => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#275DA5')
  }
  didBlur = () => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff')
  }
  render() {
    const { accounts ,changeActiveAccount} = this.props.account
    const { isEyeOpen, setIsEyeOpen } = this.props.system
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onDidFocus={this.didFocus}
          onDidBlur={this.didBlur}
        />
        <AssetsInfo setIsEyeOpen={setIsEyeOpen} isEyeOpen={isEyeOpen} assets={5000}/>
        <AccountList accounts={accounts} isEyeOpen={isEyeOpen} changeActiveAccount={changeActiveAccount}/>
      </View>

    )
  }
}


export default Assets

