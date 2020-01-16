import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, Modal } from 'react-native';
import i18n from 'I18n';
import FINGERPRINT from 'Assets/fingerprint.png'
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { I18StartType } from 'I18n/config';

const label = i18n.t('dipperin:start') as I18StartType

const client = Dimensions.get('window')

const FINGERPRINT_AVAILABLE = 'Fingerprint'

interface Props {
  startHint?: string
  proccessHint?: string
  successHint?: string
  fingerprintSuccessCb: () => void
  fingerprintFailCb: () => void
  onCancel: () => void
}

@observer
class FingerprintPop extends React.Component<Props> {
  @observable contentText: string = ''
  curTimes: number = 0

  static defaultProps = {
    startHint: label.pleaseEnterFingerprint,
    proccessHint: label.proccessAuthFingerprint,
    successHint: label.successAuthFingerprint,
  }

  componentDidMount() {
    this.changeContentText(this.props.startHint!)
    this.startFingerprint()
  }

  startFingerprint = async () => {
    try {
      const availabelResult = await FingerprintScanner.isSensorAvailable()
      if (availabelResult === FINGERPRINT_AVAILABLE) {
        const res: any = await FingerprintScanner.authenticate({ onAttempt: this.handleAuthenticationAttempted })
        if (res) {
          this.changeContentText(this.props.successHint!)
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
    if (this.curTimes >= 3) {
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
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={true}
      >
        <View style={styles.popWrapper}>
          <View style={styles.mask}>
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
          </View>
        </View>
      </Modal>
    )
  }

  @action changeContentText = (_value: string) => {
    this.contentText = _value
  }
}

export default FingerprintPop

export const styles = StyleSheet.create({
  popWrapper: {
    width: client.width,
    height: '100%',
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mask: {
    backgroundColor: '#fff',
    width: client.width * 0.86,
    borderRadius: 8,
    overflow: 'hidden',
  },

  box: {
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curStatusText: {
    color: '#1C77BC',
    fontSize: 15,
    textAlign: 'center',
  },
  fingerprintImg: {
    marginBottom: 6,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  cancelBtn: {
    alignSelf: 'center',
  },
  cancelBtnText: {
    padding: 4,
    fontSize: 16,
  },
})
