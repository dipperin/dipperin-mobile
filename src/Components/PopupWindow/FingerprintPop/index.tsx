import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, Modal, AppState } from 'react-native';
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

export const FINGERPRINT_NOT_SUPPORTED = 'FingerprintScannerNotSupported'
export const FINGERPRINT_NOT_AVAILABLE = 'FingerprintScannerNotAvailable'
export const FINGERPRINT_NOT_ENROLLED = 'FingerprintScannerNotEnrolled'
export const PASSCODE_NOT_SET = 'PasscodeNotSet'
export const AUTHENICATION_NOT_MATCH = 'AuthenticationNotMatch'
export const AUTHENTICATION_FAILED = 'AuthenticationFailed'
export const USER_CANCEL = 'UserCancel'
export const USER_FALLBACK = 'UserFallback'
export const SYSTEM_CANCEL = 'SystemCancel'
export const FINGERPRINT_UNKNOWN_ERROR = 'FingerprintScannerUnknownError'
export const DEVICE_LOCKED = 'DeviceLocked'

// Error message
const ERROR_MSG = (_label: I18StartType) => ({
  [`${FINGERPRINT_NOT_SUPPORTED}, ${FINGERPRINT_NOT_AVAILABLE}, ${FINGERPRINT_NOT_ENROLLED}, ${PASSCODE_NOT_SET}`]: label.fingerprintDisabled,
  [`${AUTHENICATION_NOT_MATCH}`]: label.AuthenticationNotMatch,
  [`${AUTHENTICATION_FAILED}`]: label.AuthenticationFailed,
  [`${USER_CANCEL}, ${USER_FALLBACK}, ${SYSTEM_CANCEL}`]: label.AuthenticationCancel,
  [`${FINGERPRINT_UNKNOWN_ERROR}`]: label.AuthenticationUnknownError,
  [`${DEVICE_LOCKED}`]: label.AuthenticationDeviceLocked,
})


@observer
class FingerprintPop extends React.Component<Props> {
  @observable contentText: string = ''
  curTimes: number = 0
  appState: any

  static defaultProps = {
    startHint: label.pleaseEnterFingerprint,
    proccessHint: label.proccessAuthFingerprint,
    successHint: label.successAuthFingerprint,
  }

  componentDidMount() {
    this.changeContentText(this.props.startHint!)
    this.startFingerprint()
    this.appState = AppState.addEventListener('change', this.appActive)
  }

  appActive = (_status: string) => {
    if (_status === 'active') {
      this.startFingerprint()
    }
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
      this.handleContentTextErrorMsg(error)

    }
  }

  handleContentTextErrorMsg = (_error: any) => {
    const _obj = ERROR_MSG(i18n.t('dipperin:start'))
    for (const key in _obj) {
      const exit = key.includes(_error.name)
      if (exit) {
        this.changeContentText(_obj[key])
      }
    }
  }

  handleAuthenticationAttempted = (error: any) => {
    this.curTimes++;
    this.handleContentTextErrorMsg(error)
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
                <Text style={styles.fingerHint}>{i18n.t('dipperin:start.threeTimesFingerprint')}</Text>
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
    flex: 1,
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
    margin: 20,
    marginTop: 16,
    minHeight: 120,
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
  fingerHint: {
    marginTop: 10,
    color: '#1C77BC',
    fontSize: 13,
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
