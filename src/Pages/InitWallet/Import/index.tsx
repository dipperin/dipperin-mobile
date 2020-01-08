import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'
import BIP39 from 'bip39'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Eye from 'Components/Eye'
import { Icon } from 'Components/Icon'
import Toast from 'Components/Toast'

import { I18ImportType } from 'I18n/config'
import WalletStore from 'Store/wallet'
import { observable, action } from 'mobx';

interface Props {
  wallet?: WalletStore
  labels: I18ImportType
  navigation: NavigationScreenProp<any>
}

@inject('wallet')
@observer
class Import extends React.Component<Props> {
  @observable mnemonic: string = ''
  @observable password: string = ''
  @observable repeatPassword: string = ''
  @observable passwordTip: string = ''
  @observable securePassword: boolean = true
  @observable agreeSelect: boolean = false

  handleImport = async () => {
    if(!(this.mnemonic && this.password && this.repeatPassword && this.agreeSelect)) return

    if (!BIP39.validateMnemonic(this.mnemonic)) {
      Toast.info('Mnemonic not available!')
      return
    }

    if (this.password.length < 8) {
      Toast.info('Password not available!')
      return
    }

    if (this.password !== this.repeatPassword) {
      Toast.info('Two passwords do not match!')
      return
    }

    const err = await this.props.wallet!.create(this.password, this.mnemonic)
    if (!err) {
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

  @action
  handleChangeRepeatPasword = (text: string) => {
    this.repeatPassword = text
  }

  @action
  handleChangePasswordTip = (text: string) => {
    this.passwordTip = text
  }

  @action
  handleChangeEye = () => {
    this.securePassword = !this.securePassword
  }

  @action
  handleChangeSelect = () => {
    this.agreeSelect = !this.agreeSelect
  }

  render() {
    const { labels } = this.props
    const diabled = !(this.mnemonic && this.password && this.repeatPassword && this.agreeSelect)
    return (
      <View style={styles.wrap}>
        <KeyboardAwareScrollView>
          <View>
            <TextInput
              onChangeText={this.handleChangeMnemonic}
              style={[styles.input, styles.mnemonic]}
              value={this.mnemonic}
              multiline
              numberOfLines={4}
              placeholder={labels.mnemonicPlh}
              placeholderTextColor='#C6C6C6'
            />
            <View style={styles.withEyeWrap}>
              <TextInput
                secureTextEntry={this.securePassword}
                onChangeText={this.handleChangePassword}
                style={[styles.input, styles.inputWithEye]}
                value={this.password}
                maxLength={24}
                placeholder={labels.passwordPlh}
              />
              <Eye isEyeOpen={!this.securePassword} onPress={this.handleChangeEye} />
            </View>
            <TextInput
              secureTextEntry={this.securePassword}
              onChangeText={this.handleChangeRepeatPasword}
              style={styles.input}
              value={this.repeatPassword}
              maxLength={24}
              placeholder={labels.repeatPasswordPlh}
            />
            <TextInput
              onChangeText={this.handleChangePasswordTip}
              style={styles.input}
              value={this.passwordTip}
              placeholder={labels.passwordTip}
            />
            <View style={styles.agreeWrap}>
              <TouchableOpacity onPress={this.handleChangeSelect}>
                {this.agreeSelect
                  ? <Icon name={"icon|danxuan"} size={17} color={"#C6C6C6"} />
                  : <View style={styles.selectIcon} />
                }
              </TouchableOpacity>
              <Text style={styles.agreeText}>{labels.agreeLabel} <Text style={styles.agree}>{labels.agree}</Text></Text>
            </View>
          </View>
          <View style={styles.btnWrap}>
            <TouchableOpacity style={[styles.btn, diabled && styles.diabledBtn]} onPress={this.handleImport} activeOpacity={0.7}>
              <Text style={styles.btnText}>{labels.btnText}</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
      </View>
    )
  }
}


const ImportWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:import') as I18ImportType
  return <Import labels={labels} navigation={navigation} />

}

export default withTranslation()(ImportWrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 23,
    justifyContent: 'space-between'
  },
  mnemonic: {
    marginBottom: 24,
    padding: 12.5,
    height: 117,
    borderWidth: 1,
    borderColor: '#E3E6EB',
    textAlignVertical: 'top',
    borderRadius: 5
  },
  withEyeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E3E6EB',
    borderBottomWidth: 1
  },
  inputWithEye: {
    flex: 1,
  },
  input: {
    height: 55,
  },
  agreeWrap: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectIcon: {
    width: 17,
    height: 17,
    borderRadius: 17,
    borderColor: '#C6C6C6',
    borderWidth: 1,
  },
  agreeText: {
    marginLeft: 5,
    color: '#B7BBBE'
  },
  agree: {
    color: '#1C77BC'
  },
  btnWrap: {
    height: 80,
  },
  btn: {
    marginHorizontal: 16.5,
    height: 44,
    borderRadius: 44,
    backgroundColor: '#1C77BC',
  },
  diabledBtn: {
    backgroundColor: '#999'
  },
  btnText: {
    lineHeight: 44,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})