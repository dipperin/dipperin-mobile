import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, EmitterSubscription, StatusBar } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'
import BIP39 from 'bip39'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Eye from 'Components/Eye'
import { Icon } from 'Components/Icon'
import { Toast } from 'Components/PopupWindow'
import { sleep, encryptionPassword } from 'Global/utils'
import { setStorage } from 'Db'
import { STORAGE_KEYS } from 'Global/constants'

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
  @observable keyboardShow: boolean = false
  @observable mnemonic: string = ''
  @observable password: string = ''
  @observable repeatPassword: string = ''
  @observable passwordTip: string = ''
  @observable securePassword: boolean = true
  @observable agreeSelect: boolean = false
  keyboardDidShowListener: EmitterSubscription
  keyboardDidHideListener: EmitterSubscription
  constructor(props: Props) {
    super(props)
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  @action
  keyboardDidShow = () => {
    this.keyboardShow = true
  }

  @action
  keyboardDidHide = () => {
    this.keyboardShow = false
  }


  handleImport = async () => {
    if (!(this.mnemonic && this.password && this.repeatPassword && this.agreeSelect)) return
    const mnemonic = this.mnemonic.trim()
    const password = this.password.trim()
    const repeatPassword = this.repeatPassword.trim()
    const { labels } = this.props

    if (!BIP39.validateMnemonic(mnemonic)) {
      Toast.info(labels.info.mnemonicNotAvailable)
      return
    }

    if (password.length < 8) {
      Toast.info(labels.info.passwordNotAvailable)
      return
    }

    if (password !== repeatPassword) {
      Toast.info(labels.info.repeatPasswordErr)
      return
    }
    Toast.loading()
    await sleep(100)
    const err = await this.props.wallet!.create(password, mnemonic)
    Toast.hide()
    if (!err) {
      setStorage(STORAGE_KEYS.PASSWORD_TIP, this.passwordTip) // set password tip in storage
      setStorage(STORAGE_KEYS.PASSWORD, encryptionPassword(password))
      this.props.navigation.navigate('wallet')
    }
  }

  @action
  handleChangeMnemonic = (text: string) => {
    this.mnemonic = text.replace(/[\u4E00-\u9FA5]/g,'')
  }

  @action
  handleChangePassword = (text: string) => {
    this.password = text.replace(/[\u4E00-\u9FA5]/g,'')
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

  showAgree = () => {
    this.props.navigation.navigate('initUserProtocol')
  }

  render() {
    const { labels } = this.props
    const disabled = !(this.mnemonic && this.password && this.repeatPassword && this.agreeSelect)
    return (
      <View style={styles.wrap}>
        <StatusBar backgroundColor='#fff' />
        <KeyboardAwareScrollView style={styles.scollWrap}>
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
          <View style={styles.inputWrap}>

            <TextInput
              secureTextEntry={this.securePassword}
              onChangeText={this.handleChangeRepeatPasword}
              style={styles.input}
              value={this.repeatPassword}
              maxLength={24}
              placeholder={labels.repeatPasswordPlh}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              onChangeText={this.handleChangePasswordTip}
              style={styles.input}
              value={this.passwordTip}
              maxLength={24}
              placeholder={labels.passwordTip}
            />
          </View>
          <View style={styles.agreeWrap}>
            <TouchableOpacity onPress={this.handleChangeSelect}>
              {this.agreeSelect
                ? <Icon name={"icon|danxuan"} size={17} color={"#1C77BC"} />
                : <View style={styles.selectIcon} />
              }
            </TouchableOpacity>
            <Text style={styles.agreeTextWrap}>
              <Text style={styles.agreeText}>
                {labels.agreeLabel}
              </Text>
              <Text onPress={this.showAgree} style={styles.agree}>{labels.agree}</Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
        {!this.keyboardShow &&
          <View style={styles.btnWrap}>
            <TouchableOpacity style={[styles.btn, disabled && styles.diabledBtn]} onPress={this.handleImport} activeOpacity={disabled ? 1 : 0.7}>
              <Text style={styles.btnText}>{labels.btnText}</Text>
            </TouchableOpacity>
          </View>
        }

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
    justifyContent: 'space-between'
  },
  scollWrap: {
    padding: 23,
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
  inputWrap: {
    borderBottomColor: '#E3E6EB',
    borderBottomWidth: 1
  },
  input: {
    height: 55,
  },
  agreeWrap: {
    marginTop: 10,
    height: 55,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  selectIcon: {
    marginTop: 2,
    width: 17,
    height: 17,
    borderRadius: 17,
    borderColor: '#C6C6C6',
    borderWidth: 1,
  },
  agreeTextWrap: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  agreeText: {
    color: '#B7BBBE'
  },
  agree: {
    color: '#1C77BC'
  },
  btnWrap: {
    height: 103,
    paddingHorizontal: 23
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