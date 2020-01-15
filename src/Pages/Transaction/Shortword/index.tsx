import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Slider,
  StatusBar,
  EmitterSubscription,
  Keyboard,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { observer, inject } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nTransactionType } from 'I18n/config'
import TransactionStore from 'Store/transaction'
import { styles } from './config'
import { Toast, Modal } from 'Components/PopupWindow'
import { fromUnitToDip } from 'Global/utils'
import WalletStore from 'Store/wallet'
import ContractStore from 'Store/contract'
import AccountStore from 'Store/account'
import { sleep, Result } from 'Global/utils'

interface Props {
  navigation: NavigationStackScreenProps['navigation']
  labels: I18nTransactionType
  transaction?: TransactionStore
  wallet?: WalletStore
  contract?: ContractStore
  account?: AccountStore
}

@inject('transaction', 'wallet', 'contract', 'account')
@observer
class Shortword extends React.Component<Props> {
  @observable shortword: string = ''
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

  @computed get txFee(): string {
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

  @action handleChangeShortword = (text: string) => {
    // limit short word in 20 letters
    if (this.validateShortword(text)) {
      this.shortword = text
    }
  }

  @action handleChangeTxfee = (num: number) => {
    this.txFeeLevel = num
  }

  validateShortword = (text: string) => {
    const reg = new RegExp('^[\u4e00-\u9fa5A-Za-z0-9]{0,20}$')
    if (!reg.test(text)) {
      return false
    }
    if (text.length > 20) {
      return false
    }
    return true
  }

  turnBack = async (timelimit: number = 0) => {
    await sleep(timelimit)
    this.props.navigation.goBack()
  }

  register = async (): Promise<Result<void>> => {
    const res = await this.props.contract!.registerShortword(
      this.shortword,
      this.txFeeLevel,
    )
    if (res.success) {
      return { success: true, result: undefined }
    } else {
      return { success: false, error: new Error() }
    }
  }

  verifyShortword = async () => {
    const { labels } = this.props
    if (this.shortword === '') {
      Toast.info(labels.emptyShortword)
      return false
    }
    const res = await this.props.contract!.queryAddressByShordword(
      this.shortword,
    )
    console.log('shortword', res)
    if (res !== '') {
      Toast.info(labels.registeredShortword)
      return false
    }
    const sw = await this.props.contract!.queryShortwordByAddr(
      this.props.account!.activeAccount!.address,
    )
    if (sw !== '') {
      Toast.info(labels.registeredAddr)
      return false
    }
    return true
  }

  handleSend = async () => {
    const ifVerifiedShortword = await this.verifyShortword()
    if (!ifVerifiedShortword) {
      return
    }
    Modal.enterPassword(this.handleConfirmTransaction)
  }

  handleConfirmTransaction = async (psw: string) => {
    await Modal.hide()
    Toast.loading()
    await sleep(300)

    if (!this.props.wallet!.checkPassword(psw)) {
      Toast.hide()
      Toast.info(this.props.labels.passwordError)
      return
    }

    const result = await this.register()
    Toast.hide()
    if (result.success) {
      this.turnBack(2000)
      Toast.success(this.props.labels.sendSuccess)
    } else {
      Toast.info(this.props.labels.sendFailure)
    }
  }

  render() {
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#fff" />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.contentWrapper}
          resetScrollToCoords={{ x: 0, y: 0 }}>
          {this.renderShortwordBox()}

          {this.renderTxFeeBox()}
        </KeyboardAwareScrollView>
        {!this.keyboardShow && this.renderBtnBox()}
      </View>
    )
  }

  renderShortwordBox() {
    const { labels } = this.props
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
    )
  }

  renderTxFeeBox() {
    const { labels } = this.props
    return (
      <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
        <View style={styles.txFeeBar}>
          <Text style={styles.txFeeLabel}>{labels.txFee}</Text>
          <Text style={styles.txFeeText}>{`${this.txFee} DIP`}</Text>
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
          <Text style={styles.btnText}>{labels.sendShortword}</Text>
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
  return <Shortword labels={labels} navigation={navigation} />
}

export default withTranslation()(Wrapped)
