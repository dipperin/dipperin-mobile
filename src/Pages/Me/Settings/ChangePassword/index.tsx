import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import {
  styles
} from './config'
import { NavigationScreenProp } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { WithTranslation, withTranslation } from 'react-i18next'
import { I18nMeType } from 'I18n/config'
import SystemStore from 'Store/System'

interface Props {
  system?: SystemStore
  navigation: NavigationScreenProp<any>
  label: I18nMeType
}

@inject('system')
@observer
class ChangePassword extends React.Component<Props> {
  @observable oldPassword: string = ''
  @observable newPassword: string = ''
  @observable confrimPassword: string = ''

  render() {
    const { label } = this.props
    return (
      <View style={styles.box}>
        <View style={styles.content}>
          <View style={[styles.inputItem, styles.inputItemBorderTopAndBottom, { marginBottom: 10 }]}>
            <Text style={styles.inputItemLabel}>{label.oldPassword}</Text>
            <TextInput
              secureTextEntry={true}
              placeholder={label.pleaseEnterOldPsd}
              autoCompleteType="password"
              style={styles.input}
              value={this.oldPassword}
              onChangeText={this.inputOldPassword}
            />
          </View>

          <View style={[styles.inputItem, styles.inputItemBorderTopAndBottom]}>
            <Text style={styles.inputItemLabel}>{label.newPassword}</Text>
            <TextInput
              secureTextEntry={true}
              placeholder={label.pleaseEnterNewPsd}
              autoCompleteType="password"
              style={styles.input}
              value={this.newPassword}
              onChangeText={this.inputNewPassword}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputItemLabel}>{label.confrimPassword}</Text>
            <TextInput
              secureTextEntry={true}
              placeholder={label.pleaseConfirmNewPsd}
              autoCompleteType="password"
              style={styles.input}
              value={this.confrimPassword}
              onChangeText={this.inputConfirmPassword}
            />
          </View>

          <Text style={styles.psdHint}>{label.psdLimit}</Text>

          <View style={styles.btnBox}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnTounch}
              onPress={this.changePassword}
            >
              <Text style={styles.btnText}>{label.confrimChange}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.forgetPassword}
          // onPress={this.resetWallet}
        >
          <Text style={styles.forgetPasswordText}>{label.forgetPassword}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  resetWallet = () => {
    this.props.system!.resetWallet()
    this.props.navigation.navigate('start')
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  // TODO
  changePassword = () => {

  }

  @action inputOldPassword = (_value: string) => {
    this.oldPassword = _value
  }

  @action inputNewPassword = (_value: string) => {
    this.newPassword = _value
  }

  @action inputConfirmPassword = (_value: string) => {
    this.confrimPassword = _value
  }
}

const ChangePasswordWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:me') as I18nMeType
  return <ChangePassword label={labels} navigation={navigation} />
}

export default withTranslation()(ChangePasswordWrap)
