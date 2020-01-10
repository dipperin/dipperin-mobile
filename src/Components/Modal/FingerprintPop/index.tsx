import React from 'react';
import PopWrapper, { PopWrapperPropsInterface } from 'Components/PopWrapper';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import i18n from 'I18n';
import FINGERPRINT from 'Assets/fingerprint.png'
import { observer } from 'mobx-react';
import { observable, reaction, action } from 'mobx';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Toast from 'Components/Toast';

const FINGERPRINT_AVAILABLE = 'Fingerprint'

interface Props extends PopWrapperPropsInterface {
  fingerprintSuccessCb: () => void
  fingerprintFailCb: () => void
}

@observer
@PopWrapper
@observer
class FingerprintPop extends React.Component<Props> {
  @observable contentText: string = i18n.t('dipperin:start.pleaseEnterFingerprint')
  curTimes: number = 0
  componentDidMount() {
    this.startFingerprint()
  }

  startFingerprint = async () => {
    try {
      const availabelResult = await FingerprintScanner.isSensorAvailable()
      if (availabelResult === FINGERPRINT_AVAILABLE) {
        const res: any = await FingerprintScanner.authenticate({ onAttempt: this.handleAuthenticationAttempted })
        if (res) {
          this.props.fingerprintSuccessCb()
        }
      }
    } catch (error) {
      this.changeContentText(error.message)
    }

  }

  handleAuthenticationAttempted = (error: any) => {
    this.curTimes++;
    this.changeContentText(error.message)
    if(this.curTimes >= 3) {
      FingerprintScanner.release()
      this.props.fingerprintFailCb()
    } 
  }

  componentWillUnmount() {
    FingerprintScanner.release()
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
          <Text style={styles.cancelBtnText}>{i18n.t('dipperin:start.cancel')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  @action changeContentText = (_value: string) => {
    this.contentText = _value
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
    textAlign: 'center'
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
