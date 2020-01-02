import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18StartType } from 'I18n/config'
import WalletStore from 'Store/wallet'

interface Props {
  wallet?: WalletStore
  labels: I18StartType
  navigation: NavigationScreenProp<any>
}

@inject('wallet')
@observer
class Start extends React.Component<Props> {
  
  test = () => {
    this.props.navigation.navigate('wallet')
  }
  
  render() {
    const { labels } = this.props
    return (
      <View>
        <TouchableOpacity onPress={this.test}>
          <Text>{labels.start}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const StartWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> } ) => {
  const { t, navigation } = props
  const labels = t('dipperin:start') as I18StartType
  return <Start labels={labels} navigation={navigation} />

}

export default withTranslation()(StartWrap)