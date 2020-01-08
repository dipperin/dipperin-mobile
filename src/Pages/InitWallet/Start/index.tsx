import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, StatusBar } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18StartType } from 'I18n/config'
import WalletStore from 'Store/wallet'
import Transaction from 'Store/transaction'

import Bg from 'Assets/start-bg.png'

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
    // this.init()
  }

  // init wallet for test
  init = async () => {
    await this.props.wallet!.create('12345678', 'model evil pulse orbit version motor outside call mesh thank alert goddess')
    // this.props.wallet!.destroyMnemonic()
  }

  // send trasaction for test
  send = () => {
    this.props.wallet!.unlockWallet('12345678')
    const data = this.props.transaction!.confirmTransaction('0x0000bf048DdCa19Eb3113b9Cd6D76F69A2ddC983f221', '1000', 'test', '100000000', '10000000')
  }

  handleCreate = () => {
    // this.props.navigation.navigate('wallet')
  }

  handleImport = () => {
    this.props.navigation.navigate('import')
  }

  render() {
    const { labels } = this.props
    return (
      <View style={styles.wrap}>
        <StatusBar backgroundColor='#204C88' />
        <ImageBackground source={Bg} style={styles.bg} >

          <TouchableOpacity style={styles.btn} onPress={this.handleCreate} activeOpacity={0.7}>
            <Text style={styles.text}>{labels.create}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.handleImport} activeOpacity={0.7}>
            <Text style={styles.text}>{labels.import}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}


const StartWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:start') as I18StartType
  return <Start labels={labels} navigation={navigation} />

}

export default withTranslation()(StartWrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    
  },
  bg: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  btn: {
    marginBottom: '15%',
    width: 135,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'rgb(48, 143, 234)',
  },
  text: {
    lineHeight: 40,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  }
})