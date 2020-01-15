import React from 'react'
import { inject, observer } from "mobx-react"
import { View, StatusBar, Platform } from 'react-native'
import { NavigationEvents } from "react-navigation"
import { NavigationStackScreenProps } from "react-navigation-stack"

import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nAccountType } from 'I18n/config'

import AssetsInfo from "./AssetsInfo"
import AccountList from "./AccountList"

import SystemStore from "Store/System"
import AccountStore from "Store/account"

interface Props {
  account?: AccountStore
  system?: SystemStore
  labels: I18nAccountType
  navigation:NavigationStackScreenProps['navigation']
}
@inject('account', 'system')
@observer
class Assets extends React.Component<Props>{
  didFocus = () => {
    this.props.navigation.setParams({title: this.props.labels.wallet})
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#275DA5')
  }
  didBlur = () => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff')
  }
  getAllAssets = () => {
    return this.props.account!.accounts.reduce((previousValue, currentValue) => {
      return Number(currentValue.balance) + previousValue
    }, 0)
  }
  render() {
    const { accounts, changeActiveAccount } = this.props.account!
    const { isEyeOpen, setIsEyeOpen } = this.props.system!
    const { labels } = this.props
    const assets = this.getAllAssets()
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onDidFocus={this.didFocus}
          onDidBlur={this.didBlur}
        />
        <AssetsInfo
          setIsEyeOpen={setIsEyeOpen}
          isEyeOpen={isEyeOpen}
          assets={assets}
          labels={labels}
        />
        <AccountList
          accounts={accounts}
          isEyeOpen={isEyeOpen}
          changeActiveAccount={changeActiveAccount}
          labels={labels}
        />
      </View>

    )
  }
}
const AssetsWrap = (props: WithTranslation& {
  navigation: NavigationStackScreenProps['navigation'];
}) => {
  const { t ,navigation} = props
  const labels = t('dipperin:account') as I18nAccountType
  return <Assets labels={labels} navigation={navigation} />
}

export default withTranslation()(AssetsWrap)

