import React from 'react';
import { View, Text, TouchableOpacity, Image, Clipboard } from 'react-native';
import FINGERPRINT from 'Assets/fingerprint.png';
import { styles } from './config';
import { NavigationScreenProp } from 'react-navigation';
// There are differences between IOS and Android
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { WithTranslation, withTranslation } from 'react-i18next'
import { I18StartType } from 'I18n/config'
import { Toast, Modal } from 'Components/PopupWindow'
import WalletStore from 'Store/wallet'
import { getStorage } from 'Db'
import { STORAGE_KEYS } from 'Global/constants'
import { decryptionPassword, Result } from 'Global/utils'
import System from 'Store/System';
import EnterPassword from 'Components/PopupWindow/EnterPassword'

interface Props {
  navigation: NavigationScreenProp<any>;
  language: I18StartType;
  wallet?: WalletStore;
  system?: System
}

@inject('wallet', 'system')
@observer
class LockPage extends React.Component<Props> {
  @observable isShowPropEnterPassword: boolean = false
  @observable fingerprintHintText: string = this.props.language.fingerprintUnlock

  componentDidMount() {
    const { isFingerUnLock } = this.props.system!
    if (isFingerUnLock) {
      this.showFingerprintUnlock()
      return
    }
    this.togglePasswordLogin()
  }

  render() {
    const { language } = this.props;
    return (
      <View style={styles.box}>
        <View style={styles.content}>
          <TouchableOpacity onPress={this.showFingerprintUnlock}>
            <Image style={styles.fingerprintImg} source={FINGERPRINT} />
          </TouchableOpacity>
          <Text style={styles.fingerHint} onPress={this.showFingerprintUnlock}>
            {language.clickAndFingerprintUnlock}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={this.togglePasswordLogin}>
          <Text style={styles.btnText}>{language.passwordUnlock}</Text>
        </TouchableOpacity>

        {
          this.isShowPropEnterPassword && (
            <EnterPassword
              hasCancel={this.props.system?.isFingerUnLock}
              onClose={this.hideEnterPassword}
              onConfirm={this.enterPassword}
            />
          )
        }
      </View>
    );
  }

  @action togglePasswordLogin = () => {
    // Show password unlock page
    // Modal.enterPassword(this.enterPassword, {hasCancel: this.props.system?.isFingerUnLock});
    this.isShowPropEnterPassword = true
  };

  @action hideEnterPassword = () => {
    this.isShowPropEnterPassword = false
  }

  showFingerprintUnlock = () => {
    Modal.FingerprintPopShow({
      successHint: this.props.language.unlocking,
    }, {
      fingerprintSuccessCb: this.fingerprintSuccessCb,
      fingerprintFailCb: this.fingerprintFailCb,
      hide: this.FingerprintPopHide,
    });
  };

  FingerprintPopHide = async () => {
    Modal.hide();
  };

  // Fingerprint success
  fingerprintSuccessCb = async () => {
    const enciryptionPassword: string = await getStorage(STORAGE_KEYS.PASSWORD) as any as string
    const _password = decryptionPassword(enciryptionPassword)
    const unlock = await this.props.wallet!.unlockWallet(_password)

    if (!unlock) {
      Modal.hide()
      Toast.info(this.props.language.passwordError)
      return
    }

    if (!this.props.system!.isFingerUnLock) {
      this.props.system!.setFingerUnLock(true)
    }
    this.navigationRedirect()
  }

  // Fingerprint fail
  fingerprintFailCb = () => {
    this.togglePasswordLogin()
  };

  enterPassword = async (password: string) => {
    Toast.loading();
    const unlock = await this.props.wallet!.unlockWallet(password)
    if (!unlock) {
      Toast.hide();
      Toast.info(this.props.language.passwordError);
      return;
    }

    Toast.hide();
    this.navigationRedirect()
  };

  detectiveClickboard = async ():Promise<Result<string>> => {
    const word = await Clipboard.getString()
    const matchResult = word.match(/address: (0x[A-Fa-f0-9]{44})/)
    if (matchResult) {
      return {success: true,result: matchResult[1]}
    }
    return {success: false, error: new Error()}
  }

  navigationRedirect = async () => {
    const { getParam } = this.props.navigation
    const type = getParam('type')
    const address = getParam('address')
    const amount = getParam('amount')
    const scheme = getParam('scheme')
    if (type === 'send') {
      this.props.navigation.navigate('send', { type, address, amount, scheme })
      return
    }
    const res = await this.detectiveClickboard()
    if (res.success) {
      this.props.navigation.navigate('send', {address: res.result})
      return
    }

    Modal.hide()
    this.props.navigation.navigate('wallet')
  }
}

const LockPageWrap = (
  props: WithTranslation & { navigation: NavigationScreenProp<any> },
) => {
  const { t, navigation } = props;
  const label = t('dipperin:start') as I18StartType;
  return <LockPage language={label} navigation={navigation} />;
};

export default withTranslation()(LockPageWrap);
