import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import FINGERPRINT from 'Assets/fingerprint.png'
import { styles } from './config'
import { NavigationScreenProp } from 'react-navigation'
// There are differences between IOS and Android
import FingerprintPop from 'Components/Modal/FingerprintPop'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { WithTranslation, withTranslation } from 'react-i18next'
import { I18StartType } from 'I18n/config'
import Modal from 'Components/Modal'
import Toast from 'Components/Toast'
import WalletStore from 'Store/wallet'

interface Props {
  navigation: NavigationScreenProp<any>
  language: I18StartType
  wallet?: WalletStore
}

@inject('wallet')
@observer
class LockPage extends React.Component<Props> {
  componentDidMount() {
    Modal.FingerprintPopShow(this.fingerprintSuccessCb, this.fingerprintFailCb, this.hideFingerPop)
  }

  render() {
    const { language } = this.props
    return (
      <View style={styles.box}>
        <View style={styles.content}>
          <TouchableOpacity onPress={this.showFingerprintUnlock}>
            <Image style={styles.fingerprintImg} source={FINGERPRINT} />
          </TouchableOpacity>
          <Text style={styles.fingerHint} onPress={this.showFingerprintUnlock}>{language.clickAndFingerprintUnlock}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={this.togglePasswordLogin}
        >
          <Text style={styles.btnText}>{language.passwordUnlock}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  togglePasswordLogin = () => {
    // TODO Route to password login page
    Modal.password(this.enterPassword)
  }

  showFingerprintUnlock = () => {
    Modal.FingerprintPopShow(this.fingerprintSuccessCb, this.fingerprintFailCb, this.hideFingerPop)
  }

  hideFingerPop = () => {
    Modal.hide()
  }

  // TODO Fingerprint success
  fingerprintSuccessCb = () => {
    console.log('指纹认证成功')
    Modal.hide()
    // TODO
    this.props.navigation.navigate('wallet')
  }

  // TODO Fingerprint fail
  fingerprintFailCb = () => {
    // Modal.password(this.enterPassword)
    this.props.navigation.navigate('wallet')
  }

  enterPassword = async (password: string) => {
    console.log('输入密码')
    Modal.hide();
    Toast.loading();
    if (!this.props.wallet!.unlockWallet(password)) {
      Toast.hide();
      Toast.info(this.props.language.passwordError);
      return;
    }
    // TODO
    this.props.navigation.navigate('wallet')
  }
}

const LockPageWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const label = t('dipperin:start') as I18StartType
  return <LockPage  language={label} navigation={navigation} />
}

export default withTranslation()(LockPageWrap)




