import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Slider,
  EmitterSubscription,
  Keyboard,
  Clipboard,
  Linking,
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { observer, inject } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nTransactionType } from 'I18n/config'
import { styles } from './config'
import {Toast, Modal} from 'Components/PopupWindow'
import TransactionStore from 'Store/transaction'
import WalletStore from 'Store/wallet'
import { fromUnitToDip, sleep, verifyBalance, encryptionPassword } from 'Global/utils'
import AccountStore from 'Store/account'
import { Utils } from '@dipperin/dipperin.js'
import ContractStore from 'Store/contract'
import System from 'Store/System';
import { getStorage } from 'Db';
import { STORAGE_KEYS } from 'Global/constants';

interface Props {
  navigation: NavigationStackScreenProps['navigation']
  labels: I18nTransactionType
  transaction?: TransactionStore
  wallet?: WalletStore
  account?: AccountStore
  contract?: ContractStore
  system?: System
}

@inject('transaction', 'wallet', 'account', 'contract', 'system')
@observer
class Send extends React.Component<Props> {
  @observable addressOrShortWord = ''
  @observable toAddress: string = ''
  @observable sendAmount: string = ''
  @observable extraData: string = ''
  @observable txFeeLevel: number = 1
  @observable keyboardShow: boolean = false
  keyboardDidShowListener: EmitterSubscription
  keyboardDidHideListener: EmitterSubscription
  constructor(props: Props) {
    super(props)
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    )
  }
  componentDidMount() {
    if (this.props.navigation.getParam('address')) {
      this.handleChangeAddressOrShortword(
        this.props.navigation.getParam('address'),
      )
    } else {
      this.getAddressFromClickboard()
    }
    if (this.props.navigation.getParam('amount')) {
      this.handleChangeSendAmount(this.props.navigation.getParam('amount'))
    }
  }

  @computed get txFee() {
    return fromUnitToDip((10 ** Number(this.txFeeLevel) / 10) * 10 ** 7)
  }

  @action
  keyboardDidShow = () => {
    this.keyboardShow = true
  }

  @action
  keyboardDidHide = () => {
    this.keyboardShow = false
  }

  @action handleChangeToAddress = (text: string) => {
    this.toAddress = text
  }
  @action handleChangeAddressOrShortword = (text: string) => {
    if (this.validateEnteringArressOrShortword(text)) {
      this.addressOrShortWord = text
    }
  }
  @action handleChangeSendAmount = (amountString: string) => {
    if (this.validateEnteringAmount(amountString)) {
      this.sendAmount = amountString
    }
  }
  @action handleChangeExtraData = (text: string) => {
    if (this.validateExtraData(text)) {
      this.extraData = text
    }
  }
  @action handleChangeTxfee = (num: number) => {
    this.txFeeLevel = num
  }

  validateEnteringAddress = (addr: string) => {
    return /^(0x)?(0000|0014)[0-9a-fA-F]{0,40}$/.test(addr)
  }

  validateEnteringShortword = (word: string) => {
    const reg = new RegExp('^[\u4e00-\u9fa5A-Za-z0-9]{0,20}$')
    if (!reg.test(word)) {
      return false
    }
    return true
  }

  validateEnteringArressOrShortword = (text: string) => {
    return (
      this.validateEnteringAddress(text) || this.validateEnteringShortword(text)
    )
  }

  validateEnteringAmount(amountString: string) {
    const reg = new RegExp('^[0-9]*([.][0-9]{0,18})?$')
    return reg.test(amountString)
  }

  validateExtraData(text: string) {
    if (text.length > 200) {
      return false
    }
    // --- add new rule here
    return true
  }

  verifyAddressOrShortword = async () => {
    const { labels } = this.props
    if (this.addressOrShortWord === '') {
      Toast.info(labels.emptyAddrOrShortword)
      return false
    }
    if (Utils.isAddress(this.addressOrShortWord)) {
      this.handleChangeToAddress(this.addressOrShortWord)
      return true
    } else {
      try {
        const res = await this.props.contract!.queryAddressByShordword(
          this.addressOrShortWord,
        )
        if (typeof res === 'string' && Utils.isAddress(res)) {
          this.handleChangeToAddress(res)
          return true
        } else {
          Toast.info(labels.invalidAddrOrUnregiteredShortword)
          return false
        }
      } catch (e) {
        Toast.info(labels.invalidAddrOrUnregiteredShortword)
        return false
      }
    }
  }

  verifyAmount = () => {
    if (this.sendAmount === '') {
      Toast.info(this.props.labels.emptySendAmount)
      return false
    }
    return true
  }

  verifyBalance = () => {
    if (
      !verifyBalance(
        this.sendAmount,
        this.txFee,
        this.props.account!.activeAccount!.balance,
      )
    ) {
      Toast.info(this.props.labels.noEnoughBalance)
      return false
    }
    return true
  }

  getAddressFromClickboard = async () => {
    const word = await Clipboard.getString()
    if (Utils.isAddress(word)) {
      this.handleChangeAddressOrShortword(word)
      return
    }

    const account = await this.props.contract!.queryAddressByShordword(word)
    if (account && this.addressOrShortWord === '') {
      this.handleChangeAddressOrShortword(word)
    }
  }

  sendTransaction = async () => {
    // to get really to address
    // 1. verify address
    // 2. check if registered shortword
    // 3. throw error or send tx
    const res = await this.props.transaction!.confirmTransaction(
      this.toAddress,
      this.sendAmount,
      this.extraData,
      '10000000',
      '1',
    )
    if (res.success) {
      return res
    } else {
      console.warn(res.error.message)
      Toast.info(this.props.labels.returnError + res.error.message)
      return res
    }
  }

  turnBack = async (timelimit: number = 0) => {
    await sleep(timelimit)
    this.props.navigation.goBack()
  }

  handleSend = async () => {
    const ifVerifyAddress = await this.verifyAddressOrShortword()
    if (!ifVerifyAddress) {
      return
    }
    if (!this.verifyAmount()) {
      return
    }
    if (!this.verifyBalance()) {
      return
    }

    const {isFingerPay} = this.props.system!
    if (isFingerPay) {
      Modal.FingerprintPopShow({successHint: this.props.labels.proccessPay}, {
        fingerprintFailCb: this.handleFingerprintFailCb,
        fingerprintSuccessCb: this.handleFingerprintSuccessCb,
        hide: () => Modal.hide(),
      })
      return
    }
    Modal.enterPassword(this.handleConfirmTransaction, {hasCancel: true})
  }

  handleFingerprintFailCb = () => {
    Modal.hide()
  }
  handleFingerprintSuccessCb = async() => {
    const _password = await getStorage(STORAGE_KEYS.PASSWORD)
    this.handleConfirmTransaction(encryptionPassword(_password))
  }

  handleConfirmTransaction = async (psw: string) => {
    Modal.hide()
    Toast.loading()

    if (!this.props.wallet!.checkPassword(psw)) {
      Toast.hide()
      Toast.info(this.props.labels.passwordError)
      return
    }

    const res = await this.sendTransaction()
    Toast.hide()
    if (res.success) {
      Toast.success(this.props.labels.sendSuccess)
      this.linkingAppCallBack(true)
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Assets' }),
          NavigationActions.navigate({ routeName: 'accountDetail' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      Toast.info(this.props.labels.sendFailure)
      this.linkingAppCallBack(false)
    }
  }

  // Linking open app callback
  linkingAppCallBack = (success: boolean) => {
    const { getParam } = this.props.navigation
    const type = getParam('type')
    if (type !== 'send') {return}
    const scheme = getParam('scheme')
    if (scheme) {
      Linking.canOpenURL(`${scheme}://`).then(res => {
        if (res) {
          Linking.openURL(`${scheme}://sendcb?success=${success}`)
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.mainWrapper}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.contentWrapper}
          resetScrollToCoords={{ x: 0, y: 0 }}>
          {this.renderAddressBox()}

          {this.renderAmountBox()}

          {this.renderExtraDataBox()}

          {this.renderTxFeeBox()}
        </KeyboardAwareScrollView>
        {!this.keyboardShow && this.renderBtnBox()}
      </View>
    )
  }

  renderAddressBox() {
    const { labels } = this.props
    return (
      <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
        <View style={styles.toAddressLabel}>
          <Text style={styles.toAddressText}>{labels.toAddress}</Text>
        </View>
        <TextInput
          style={styles.toAddressInput}
          value={this.addressOrShortWord}
          onChangeText={this.handleChangeAddressOrShortword}
          placeholder={labels.enterAddressOrWord}
        />
      </TouchableOpacity>
    )
  }

  renderAmountBox() {
    const { labels } = this.props
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
    )
  }

  renderExtraDataBox() {
    const { labels } = this.props
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
    )
  }

  renderTxFeeBox() {
    const { labels } = this.props
    return (
      <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
        <View style={styles.txFeeBar}>
          <Text style={styles.txFeeLabel}>{labels.txFee}</Text>
          <Text style={styles.txFeeText}>{this.txFee} DIP</Text>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={3}
          minimumTrackTintColor="#0099cb"
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
    )
  }
  renderBtnBox() {
    const { labels } = this.props
    return (
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={this.handleSend}
        activeOpacity={0.8}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>{labels.send}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const Wrapped = (
  props: WithTranslation & {
    navigation: NavigationStackScreenProps['navigation']
  },
) => {
  const { t, navigation } = props
  const labels = t('dipperin:transaction') as I18nTransactionType
  return <Send labels={labels} navigation={navigation} />
}

export default withTranslation()(Wrapped)
