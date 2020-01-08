import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, ToastAndroid} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18StartType } from 'I18n/config'
import WalletStore from 'Store/wallet'
import { observable, action } from 'mobx';

interface Props {
  wallet?: WalletStore
  labels: I18StartType
  navigation: NavigationScreenProp<any>
}

@inject('wallet')
@observer
class Import extends React.Component<Props> {
  @observable mnemonic: string = ''
  @observable password: string = ''

  handleImport = async () => {
    ToastAndroid.showWithGravity(
      'testttttttt',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
    return
    if(this.password.length < 8) return
    const err = await this.props.wallet!.create(this.password, this.mnemonic)
    if(!err) {
      this.props.navigation.navigate('wallet')
    }
  }

  @action
  handleChangeMnemonic = (text: string) => {
    this.mnemonic = text
  }

  @action
  handleChangePassword = (text: string) => {
    this.password = text
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Text>mnemonic</Text>
        <TextInput onChangeText={this.handleChangeMnemonic} value={this.mnemonic} />
        <Text>password</Text>
        <TextInput onChangeText={this.handleChangePassword} autoCompleteType='password' value={this.password} />
        <TouchableOpacity style={styles.btn} onPress={this.handleImport} activeOpacity={0.7}>
            <Text style={styles.btnText}>Import</Text>
          </TouchableOpacity>

      </View>
    )
  }
}


const ImportWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:start') as I18StartType
  return <Import labels={labels} navigation={navigation} />

}

export default withTranslation()(ImportWrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    
  },
  btn: {
    marginBottom: '15%',
    marginHorizontal: '10%',
    height: 40,
    borderRadius: 40,
    backgroundColor: 'rgb(48, 143, 234)',
  },
  btnText: {
    lineHeight: 40,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  }
 
})