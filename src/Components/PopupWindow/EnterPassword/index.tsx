import React from 'react'
import { Text, View, TextInput, StatusBar } from 'react-native'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Modal, Provider } from '@ant-design/react-native'

import { I18nTransactionType } from 'I18n/config'
import i18n from 'I18n'
import { getStorage } from 'Db'
import { STORAGE_KEYS } from 'Global/constants'
import { styles } from './config'

interface Props {
  hasCancel?: boolean
  onClose: () => void
  onConfirm: (password: string) => Promise<void>
}



@observer
class EnterPassword extends React.Component<Props> {
  @observable password: string = ''
  @observable passwordHint: string = ''

  static defaultProps = {
    hasCancel: true,
  }
  componentDidMount() {
    this.getPasswordHint()
  }

  @action private setPasswordHint = (tip: string) => {
    this.passwordHint = tip
  }

  @action private setPassword = (text: string) => {
    this.password = text
  }

  getPasswordHint = async () => {
    const hint = await getStorage(STORAGE_KEYS.PASSWORD_TIP)
    this.setPasswordHint(hint)
  }

  handleChangePassword = (text: string) => {
    this.setPassword(text)
  }

  handleConfirm = async () => {
    try {
      await this.props.onConfirm(this.password)
    } finally {
      this.setPassword('')
    }
  }

  render() {
    const labels = i18n.t('dipperin:transaction') as I18nTransactionType
    return (
      <Provider>
        <StatusBar backgroundColor="#808080" />
        <Modal
          title={labels.enterPassword}
          transparent
          // onClose={this.props.onClose}
          maskClosable
          visible={true}
          style={styles.modal}>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.passwordInput}
              value={this.password}
              onChangeText={this.handleChangePassword}
              placeholder={labels.enterPassword}
              secureTextEntry={true}
            />
            <View style={styles.passwordHintWrapper}>
              <Text style={styles.passwordHint}>{labels.passwordHit} </Text>
              <Text style={styles.passwordHintContent}>
                {this.passwordHint}
              </Text>
            </View>
          </View>
          <View style={styles.btnBox}>
            {this.props.hasCancel && (
              <Button
                style={styles.cancelBtn}
                type={'primary'}
                onPress={this.props.onClose}>
                {labels.cancel}
              </Button>
            )}

            <Button
              style={styles.confirmBtn}
              type={'primary'}
              onPress={this.handleConfirm}>
              {labels.confirm}
            </Button>
          </View>
        </Modal>
      </Provider>
    )
  }
}

export default EnterPassword
