import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Slider,
  EmitterSubscription,
  Keyboard,
  Clipboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {observer, inject} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import {withTranslation, WithTranslation} from 'react-i18next';
import {I18nTransactionType} from 'I18n/config';
import {styles} from './config';
import Toast from 'Components/Toast';
import Modal from 'Components/Modal';
import TransactionStore from 'Store/transaction';
import WalletStore from 'Store/wallet';
import {fromUnitToDip, sleep} from 'Global/utils';
import AccountStore from 'Store/account';
import {Utils} from '@dipperin/dipperin.js';
import ContractStore from 'Store/contract';

interface Props {
  navigation: NavigationStackScreenProps['navigation'];
  labels: I18nTransactionType;
  transaction?: TransactionStore;
  wallet?: WalletStore;
  account?: AccountStore;
  contract?: ContractStore;
}

@inject('transaction', 'wallet', 'account', 'contract')
@observer
class Send extends React.Component<Props> {
  @observable addressOrShortWord = '';
  @observable toAddress: string = '';
  @observable sendAmount: string = '';
  @observable extraData: string = '';
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
  componentDidMount() {
    if (this.props.navigation.getParam('address')) {
      this.handleChangeToAddress(this.props.navigation.getParam('address'));
    } else {
      this.getAddressFromClickboard();
    }
  }

  @computed get txFee() {
    return fromUnitToDip((10 ** Number(this.txFeeLevel) / 10) * 10 ** 7);
  }

  @action
  keyboardDidShow = () => {
    this.keyboardShow = true;
  };

  @action
  keyboardDidHide = () => {
    this.keyboardShow = false;
  };

  @action handleChangeToAddress = (text: string) => {
    this.toAddress = text;
  };
  @action handleChangeAddressOrShortword = (text: string) => {
    this.addressOrShortWord = text;
  };
  @action handleChangeSendAmount = (amountString: string) => {
    if (this.validateEnteringAmount(amountString)) {
      this.sendAmount = amountString;
    }
  };
  @action handleChangeExtraData = (text: string) => {
    if (this.validateExtraData(text)) {
      this.extraData = text;
    }
  };
  @action handleChangeTxfee = (num: number) => {
    this.txFeeLevel = num;
  };

  validateEnteringAmount(amountString: string) {
    const reg = new RegExp('^[0-9]*(.[0-9]{0,18})?$');
    return reg.test(amountString);
  }

  validateExtraData(text: string) {
    if (text.length > 200) {
      return false;
    }
    // --- add new rule here
    return true;
  }

  verifyAddressOrShortword = async () => {
    if (this.addressOrShortWord === '') {
      Toast.info('地址/口令不能为空');
      return false;
    }
    if (Utils.isAddress(this.addressOrShortWord)) {
      this.handleChangeToAddress(this.addressOrShortWord);
      return true;
    } else {
      try {
        const res = await this.props.contract!.queryAddressByShordword(
          this.addressOrShortWord,
        );
        if (typeof res === 'string') {
          this.handleChangeToAddress(res);
          return true;
        } else {
          Toast.info('地址不合法或口令不存在');
          return false;
        }
      } catch (e) {
        Toast.info('地址不合法或口令不存在');
        return false;
      }
    }
  };

  getAddressFromClickboard = async () => {
    const word = await Clipboard.getString();
    this.handleChangeAddressOrShortword(word);
  };

  sendTransaction = async () => {
    // to get really to address
    // 1. verify address
    // 2. check if registered shortword
    // 3. throw error or send tx
    try {
      const res = await this.props.transaction!.confirmTransaction(
        this.toAddress,
        this.sendAmount,
        this.extraData,
        '10000000',
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
    await sleep(100);
    Toast.loading();
    // Toast.hide();
    if (!this.props.wallet!.unlockWallet(psw)) {
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
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.contentWrapper}
          resetScrollToCoords={{x: 0, y: 0}}>
          {this.renderAddressBox()}

          {this.renderAmountBox()}

          {this.renderExtraDataBox()}

          {this.renderTxFeeBox()}
        </KeyboardAwareScrollView>
        {!this.keyboardShow && this.renderBtnBox()}
      </View>
    );
  }

  renderAddressBox() {
    const {labels} = this.props;
    return (
      <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
        <View style={styles.toAddressLabel}>
          <Text style={styles.toAddressText}>{labels.toAddress}</Text>
        </View>
        <TextInput
          style={styles.toAddressInput}
          value={this.toAddress}
          onChangeText={this.handleChangeAddressOrShortword}
          placeholder={labels.enterAddressOrWord}
        />
      </TouchableOpacity>
    );
  }

  renderAmountBox() {
    const {labels} = this.props;
    return (
      <TouchableOpacity style={styles.sendAmountWrapper} activeOpacity={0.8}>
        <View style={styles.sendAmountBar}>
          <Text style={styles.sendAmountLabel}>{labels.sendAmount}</Text>
          <Text style={styles.balanceText}>{`${labels.balance}: ${
            this.props.account!.activeAccount!.balance
          } DIP`}</Text>
        </View>
        <TextInput
          style={styles.sendAmountInput}
          value={this.sendAmount}
          onChangeText={this.handleChangeSendAmount}
          placeholder={labels.enterAmount}
          keyboardType="numeric"
        />
      </TouchableOpacity>
    );
  }

  renderExtraDataBox() {
    const {labels} = this.props;
    return (
      <TouchableOpacity style={styles.extraDataWrapper} activeOpacity={0.8}>
        <View style={styles.extraDataBar}>
          <Text style={styles.extraDataLabel}>
            {labels.remark}({labels.optional})
          </Text>
        </View>
        <TextInput
          style={styles.extraDataInput}
          value={this.extraData}
          onChangeText={this.handleChangeExtraData}
          placeholder={labels.enterRemark}
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
          <Text style={styles.txFeeText}>{this.txFee} DIP</Text>
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
          <Text style={styles.btnText}>{labels.send}</Text>
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
  return <Send labels={labels} navigation={navigation} />;
};

export default withTranslation()(Wrapped);
