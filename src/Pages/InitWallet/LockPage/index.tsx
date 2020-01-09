import React from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import FINGERPRINT from 'Assets/fingerprint.png'
import { styles } from './config'
import { NavigationScreenProp } from 'react-navigation'
// There are differences between IOS and Android
import FingerprintScanner from 'react-native-fingerprint-scanner';

interface Props {
  navigation: NavigationScreenProp<any>
}

class LockPage extends React.Component<Props> {
  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then((res: any) => {
        Alert.alert('success: ' + res)
      })
      .catch((error: any) => {
        Alert.alert('fail: ' + error.message)
      })
  }

  handleAuthenticationAttempted = (error: any) => {
    Alert.alert('error: '+error.message)
  }

  render() {
    return (
      <View style={styles.box}>
        <View style={styles.content}>
          <Image style={styles.fingerprintImg} source={FINGERPRINT} />
          <Text style={styles.fingerHint}>输入指纹登录</Text>
        </View>
        <TouchableOpacity 
          style={styles.btn}
          activeOpacity={0.7}
          onPress={this.togglePasswordLogin}
        >
          <Text style={styles.btnText}>密码登录</Text>
        </TouchableOpacity>
      </View>
    )
  }

  togglePasswordLogin = () => {
    // TODO Route to password login page
  }
}

export default LockPage




