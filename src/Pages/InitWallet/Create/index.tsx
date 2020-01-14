import React from 'react'
import { observable, action } from 'mobx'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Keyboard, EmitterSubscription, StatusBar } from 'react-native'
import { inject, observer } from 'mobx-react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { NavigationScreenProp } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Eye from 'Components/Eye'
import { Icon } from 'Components/Icon'
import Toast from 'Components/Toast'
import { setStorage } from 'Db'
import { encryptionPassword } from 'Global/utils'

import { I18CreateType } from 'I18n/config'
import WalletStore from 'Store/wallet'

import WalletIcon from 'Assets/create-wallet.png'
import { STORAGE_KEYS } from 'Global/constants';

interface Props {
  wallet?: WalletStore,
  labels: I18CreateType,
  navigation: NavigationScreenProp<any>
}

@inject('wallet')
@observer
class Create extends React.Component<Props> {
  @observable keyboardShow: boolean = false
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


  handleCreate = async () => {
    if (!(this.password && this.repeatPassword && this.agreeSelect)) return
    const password = this.password
    const repeatPassword = this.repeatPassword
    const { labels } = this.props

    if (password.length < 8) {
      Toast.info(labels.info.passwordNotAvailable)
      return
    }

    if (password !== repeatPassword) {
      Toast.info(labels.info.repeatPasswordErr)
      return
    }

    const err = await this.props.wallet!.create(password)
    if (!err) {
      setStorage(STORAGE_KEYS.PASSWORD_TIP, this.passwordTip) // set password tip in storage
      setStorage(STORAGE_KEYS.PASSWORD, encryptionPassword(password))
      this.props.navigation.navigate('createStep1')
    }
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

  showAgree = () => {

  }

  render() {
    const { labels } = this.props
    const disabled = !(this.password && this.repeatPassword && this.agreeSelect)
    return (
      <View style={styles.wrap}>
        <StatusBar backgroundColor='#fff' />
        <KeyboardAwareScrollView style={styles.scrollWrap}>
          <View style={styles.iconWrap}>
            <Image style={styles.walletIcon} source={WalletIcon} resizeMode='contain' />
          </View>
          <Text style={styles.title}>{labels.title}</Text>
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
            <View style={styles.agreeTextWrap}>
              <Text style={styles.agreeText}>
              {labels.agreeLabel}
              </Text>
              <TouchableOpacity onPress={this.showAgree}>
                <Text style={styles.agree}>{labels.agree}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {!this.keyboardShow && <View style={styles.btnWrap}>
          <TouchableOpacity style={[styles.btn, disabled && styles.diabledBtn]} onPress={this.handleCreate} activeOpacity={disabled ? 1 :0.7}>
            <Text style={styles.btnText}>{labels.btnText}</Text>
          </TouchableOpacity>
        </View>}
      </View>
    )
  }

}

const CreateWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:create') as I18CreateType
  return <Create labels={labels} navigation={navigation} />

}

export default withTranslation()(CreateWrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollWrap: {
    padding: 23,
  },
  iconWrap: {
    alignItems: 'center'
  },
  walletIcon: {
    marginBottom: 10,
    width: 78,
    height: 78
  },
  title: {
    marginBottom: 32,
    fontSize: 18,
    color: '#393B42',
    fontWeight: 'bold',
    textAlign: 'center'
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
    paddingHorizontal: 23,
    height: 103,
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