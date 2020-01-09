import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import FINGERPRINT from 'Assets/fingerprint.png'
import { styles } from './config'
import { NavigationScreenProp } from 'react-navigation'
// There are differences between IOS and Android
import FingerprintPop from 'Components/FingerprintPop'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { WithTranslation, withTranslation } from 'react-i18next'
import { I18StartType } from 'I18n/config'

interface Props {
  navigation: NavigationScreenProp<any>
  language: I18StartType
}

@observer
class LockPage extends React.Component<Props> {
  @observable isShowFingerprint = true

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

        <FingerprintPop
          isConfirm={false}
          visible={this.isShowFingerprint}
          onCancel={this.hideFingerprintUnlock}
          fingerprintSuccessCb={this.fingerprintSuccessCb}
        />
      </View>
    )
  }

  togglePasswordLogin = () => {
    // TODO Route to password login page
  }

  // TODO Fingerprint success
  fingerprintSuccessCb = () => {

  }

  @action hideFingerprintUnlock = () => {
    this.isShowFingerprint = false
  }

  @action showFingerprintUnlock = () => {
    this.isShowFingerprint = true
  }
}

const LockPageWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const label = t('dipperin:start') as I18StartType
  return <LockPage language={label} navigation={navigation} />
}

export default withTranslation()(LockPageWrap)




