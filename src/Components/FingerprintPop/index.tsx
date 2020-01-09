import React from 'react';
import PopWrapper, { PopWrapperPropsInterface } from 'Components/PopWrapper';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import i18n from 'I18n';
import FINGERPRINT from 'Assets/fingerprint.png'
import { observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import FingerprintScanner from 'react-native-fingerprint-scanner';

interface Props extends PopWrapperPropsInterface {
  fingerprintSuccessCb: () => void
}

@PopWrapper
@observer
class FingerprintPop extends React.Component<Props> {
  @observable contentText: string = '请录入指纹登录'

  componentDidMount() {
    reaction(() => this.props.visible, (visible: boolean) => {
      console.log('visible:', visible)
      visible && FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then((res: any) => {
        Alert.alert('success: ' + res)
      })
      .catch((error: any) => {
        Alert.alert('fail: ' + error.message)
      })
    })
  }

  // static getDerivedStateFromProps(props: Props) {
  //   return null
  // }

  handleAuthenticationAttempted = (error: any) => {
    Alert.alert('error: ' + error.message)
  }


  render() {
    const { onCancel } = this.props
    return (
      <View style={styles.box}>
        <View style={styles.content}>
          <Image style={styles.fingerprintImg} source={FINGERPRINT} />
          <Text style={styles.curStatusText}>{this.contentText}</Text>
        </View>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancel}
        >
          <Text style={styles.cancelBtnText}>{i18n.t('dipperin:cancel')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FingerprintPop

export const styles = StyleSheet.create({
  box: {
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  curStatusText: {
    color: '#1C77BC',
    fontSize: 15,
  },
  fingerprintImg: {
    marginBottom: 6,
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },

  cancelBtn: {
    alignSelf: 'center'
  },
  cancelBtnText: {
    padding: 4,
    fontSize: 16
  }
})
