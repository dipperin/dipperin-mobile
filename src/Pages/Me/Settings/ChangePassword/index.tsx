import React from 'react'
import {View, Text, Alert} from 'react-native'

import {
  styles
} from './config'
import { NavigationScreenProp } from 'react-navigation'
import { InputItem, List } from '@ant-design/react-native'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

interface Props {
  navigation: NavigationScreenProp<any>
}

@observer
class ChangePassword extends React.Component<Props> {
  @observable oldPassword: string = ''
  @observable newPassword: string = ''
  @observable confrimPassword: string = ''

  render() {
    return (
      <View style={styles.box}>
        <View style={styles.headerWrap}>
          <Text style={styles.cancelText} onPress={this.goBack}>取消</Text>
          <Text style={styles.title}>修改密码</Text>
          <Text style={styles.savePassword} onPress={this.handleSave}>保存</Text>
        </View>
        <List style={styles.content}>
          <InputItem 
            type="password" 
            placeholder="请输入旧密码"
            style={styles.inputItem}
            value={this.oldPassword}
            onChange={this.inputOldPassword}
          >旧密码</InputItem>
          <InputItem 
            type="password" 
            placeholder="请输入新密码"
            style={styles.inputItem}
            value={this.newPassword}
            onChange={this.inputNewPassword}
          >新密码</InputItem>
          <InputItem 
            type="password"
            placeholder="请再次输入"
            style={styles.inputItem}
            value={this.confrimPassword}
            onChange={this.inputConfirmPassword}
          >确认密码</InputItem>
        </List>
      </View>
    )
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  // TODO
  handleSave = () => {
    
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

export default ChangePassword
