import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Slider,
  StatusBar,
  EmitterSubscription,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import {withTranslation, WithTranslation} from 'react-i18next';
import {I18nTransactionType} from 'I18n/config';
import TransactionStore from 'Store/transaction';
import {styles} from './config';
import Toast from 'Components/Toast';
import Modal from 'Components/Modal';
import {sleep} from 'Global/utils';
import WalletStore from 'Store/wallet';

interface Props {
  navigation: NavigationStackScreenProps['navigation'];
  labels: I18nTransactionType;
  transaction?: TransactionStore;
  wallet?: WalletStore;
}

@inject('transaction', 'wallet')
@observer
class Shortword extends React.Component<Props> {
  @observable shortword: string = '';
  @observable txFeeLevel: number = 1;
  @observable keyboardShow: boolean = false;
  keyboardDidShowListener: EmitterSubscription;
  keyboardDidHideListener: EmitterSubscription;
  constructor(props: Props) {
    super(props);
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  @action
  keyboardDidShow = () => {
    this.keyboardShow = true;
  };

  @action
  keyboardDidHide = () => {
    this.keyboardShow = false;
  };

  @action handleChangeShortword = (text: string) => {
    this.shortword = text;
  };

  @action handleChangeTxfee = (num: number) => {
    this.txFeeLevel = num;
  };

  sendTransaction = async () => {
    try {
      const res = await this.props.transaction!.confirmTransaction(
        this.shortword,
        '0',
        '',
        '21000',
        '1',
      );
      if (res.success) {
        console.warn('success');
        return Promise.resolve();
      } else {
        console.warn(res.info);
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject();
    }
  };

  handleSend = () => {
    Modal.password(this.handleConfirmTransaction);
    // this.setPasswordModal(true);
    // this.sendTransaction();
  };

  handleConfirmTransaction = async (psw: string) => {
    Modal.hide();
    Toast.loading();
    await sleep(1000);
    Toast.hide();
    if (!this.props.wallet!.checkPassword(psw)) {
      Toast.hide();
      Toast.info(this.props.labels.passwordError);
      return;
    }

    try {
      await this.sendTransaction();
      Toast.hide();
      Toast.success(this.props.labels.sendSuccess);
      return;
    } catch (e) {
      Toast.hide();
      Toast.info(this.props.labels.sendFailure);
    }
  };

  render() {
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#fff" />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.contentWrapper}
          resetScrollToCoords={{x: 0, y: 0}}>
          {this.renderShortwordBox()}

          {this.renderTxFeeBox()}
        </KeyboardAwareScrollView>
        {!this.keyboardShow && this.renderBtnBox()}
      </View>
    );
  }

  renderShortwordBox() {
    const {labels} = this.props;
    return (
      <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
        <View style={styles.toAddressLabel}>
          <Text style={styles.toAddressText}>{labels.shortword}</Text>
        </View>
        <TextInput
          style={styles.toAddressInput}
          value={this.shortword}
          onChangeText={this.handleChangeShortword}
          placeholder={labels.enterRegisterShortword}
        />
      </TouchableOpacity>
    );
  }

  renderTxFeeBox() {
    const {labels} = this.props;
    return (
      <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
        <View style={styles.txFeeBar}>
          <Text style={styles.txFeeLabel}>{labels.txFee}</Text>
          <Text style={styles.txFeeText}>0.000000000000021 DIP</Text>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={3}
          step={1}
          onValueChange={this.handleChangeTxfee}
        />
        <View style={styles.txFeeBottomBar}>
          <Text
            style={
              this.txFeeLevel >= 1
                ? styles.activeFeeLevel
                : styles.defalutFeeLevel
            }>
            {labels.low}
          </Text>
          <Text
            style={
              this.txFeeLevel >= 2
                ? styles.activeFeeLevel
                : styles.defalutFeeLevel
            }>
            {labels.middle}
          </Text>
          <Text
            style={
              this.txFeeLevel >= 3
                ? styles.activeFeeLevel
                : styles.defalutFeeLevel
            }>
            {labels.high}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  renderBtnBox() {
    const {labels} = this.props;
    return (
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={this.handleSend}
        activeOpacity={0.8}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>{labels.sendShortword}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const Wrapped = (
  props: WithTranslation & {
    navigation: NavigationStackScreenProps['navigation'];
  },
) => {
  const {t, navigation} = props;
  const labels = t('dipperin:transaction') as I18nTransactionType;
  return <Shortword labels={labels} navigation={navigation} />;
};

export default withTranslation()(Wrapped);
