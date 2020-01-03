import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18StartType } from 'I18n/config'
import WalletStore from 'Store/wallet'
import Transaction from 'Store/transaction'

interface Props {
  wallet?: WalletStore
  transaction?: Transaction
  labels: I18StartType
  navigation: NavigationScreenProp<any>
}

@inject('wallet', 'transaction')
@observer
class Start extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.init()
  }
  
  // init wallet for test
  init = async () => {
    await this.props.wallet!.create('12345678', 'model evil pulse orbit version motor outside call mesh thank alert goddess')
    // this.props.wallet!.destroyMnemonic()
  }

  // send trasaction for test
  send = () => {
    const data = this.props.transaction!.confirmTransaction('0x0000bf048DdCa19Eb3113b9Cd6D76F69A2ddC983f221','1000','test','100000000', '10000000')
    console.log(data, 'tx')
  }

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
        <TouchableOpacity onPress={this.send}>
          <Text>send tx</Text>
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