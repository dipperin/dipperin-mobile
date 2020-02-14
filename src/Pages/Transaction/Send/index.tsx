import React from 'react'
import {
  View,
  EmitterSubscription,
  Keyboard,
  Clipboard,
  Linking,
} from 'react-native'
import {
  NavigationActions,
  StackActions,
  NavigationEvents,
} from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { observer, inject } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nTransactionType } from 'I18n/config'
import {
  styles,
  validateEnteringArressOrShortword,
  validateEnteringAmount,
  validateExtraData,
} from './config'
import { Toast, Modal } from 'Components/PopupWindow'
import TransactionStore from 'Store/transaction'
import WalletStore from 'Store/wallet'
import {
  fromUnitToDip,
  sleep,
  verifyBalance,
  encryptionPassword,
  Success,
} from 'Global/utils'
import AccountStore from 'Store/account'
import { Utils } from '@dipperin/dipperin.js'
import ContractStore from 'Store/contract'
import System from 'Store/System'
import { getStorage } from 'Db'
import { STORAGE_KEYS, DEFAULT_GASLIMIT } from 'Global/constants'
import { handleError } from 'Global/errors'
import AddressBox from './AddressBox'
import AmoutBox from './AmountBox'
import ExtraData from './ExtraDataBox'
import BtnBox from './BtnBox'
import TxFeeBox from './TxFeeBox'

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
export class Send extends React.Component<Props> {
  render() {
    return (
      <View style={styles.mainWrapper}>
        <NavigationEvents onDidFocus={this.didFocus} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.contentWrapper}
          resetScrollToCoords={{ x: 0, y: 0 }}>
          <AddressBox
            labels={this.props.labels}
            value={this.addressOrShortWord}
            handleChange={this.handleChangeAddressOrShortword}
          />

          <AmoutBox
            labels={this.props.labels}
            value={this.sendAmount}
            balance={this.props.account!.activeAccount!.balance || '0'}
            handleChange={this.handleChangeSendAmount}
          />

          <ExtraData
            labels={this.props.labels}
            value={this.extraData}
            handleChange={this.handleChangeExtraData}
          />

          <TxFeeBox
            labels={this.props.labels}
            fee={this.txFee}
            value={this.txFeeLevel}
            handleChange={this.handleChangeTxfee}
          />
        </KeyboardAwareScrollView>
        {!this.keyboardShow && (
          <BtnBox labels={this.props.labels} onPress={this.handleSend} />
        )}
      </View>
    )
  }
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
  didFocus = () => {
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

    const extraData = this.props.navigation.getParam('extraData')
    if (extraData) {
      this.handleChangeExtraData(extraData)
    }
  }
  componentDidMount() {
    this.didFocus()
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
    if (validateEnteringArressOrShortword(text)) {
      this.addressOrShortWord = text
    }
  }
  @action handleChangeSendAmount = (amountString: string) => {
    if (validateEnteringAmount(amountString)) {
      this.sendAmount = amountString
    }
  }
  @action handleChangeExtraData = (text: string) => {
    if (validateExtraData(text)) {
      this.extraData = text
    }
  }
  @action handleChangeTxfee = (num: number) => {
    this.txFeeLevel = num
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
      if (this.props.account!.activeAccount!.balance === '0') {
        Toast.info(this.props.labels.noEnoughBalance)
        return false
      }

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
    const parseAccount = word.match(/^(0x)?(0000|0014)[0-9a-fA-F]{40}$/)
    if (parseAccount && Utils.isAddress(parseAccount[0])) {
      this.handleChangeAddressOrShortword(parseAccount[0])
      return
    }
    const parseShortword = word.match(
      /short word: ([\u4e00-\u9fa5A-Za-z0-9]{1,20})/,
    )
    const res = await this.queryShortWord(
      (parseShortword && parseShortword[1]) || '',
    )
    if (res) {
      return
    }
    this.queryShortWord(word)
  }

  queryShortWord = async (word: string): Promise<boolean> => {
    if (!/[\u4e00-\u9fa5A-Za-z0-9]{1,20}/.test(word)) {
      return false
    }
    const account = await this.props.contract!.queryAddressByShordword(word)
    if (account && this.addressOrShortWord === '') {
      this.handleChangeAddressOrShortword(word)
      return true
    }
    return false
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
      DEFAULT_GASLIMIT,
      String(10 ** this.txFeeLevel),
    )
    if (res.success) {
      return res
    } else {
      const errToast = handleError(res.error.message)
      return { success: false, error: new Error(errToast) }
    }
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
    // Modal.enterPassword(this.handleConfirmTransaction, { hasCancel: true })

    const { isFingerPay } = this.props.system!
    if (isFingerPay) {
      Modal.FingerprintPopShow(
        {
          successHint: this.props.labels.proccessPay,
          startHint: this.props.labels.pleaseEnterFingerprint,
        },
        {
          fingerprintFailCb: this.handleFingerprintFailCb,
          fingerprintSuccessCb: this.handleFingerprintSuccessCb,
          hide: () => Modal.hide(),
        },
      )
      return
    }
    Modal.enterPassword(this.handleConfirmTransaction, { hasCancel: true })
  }

  handleFingerprintFailCb = () => {
    Modal.hide()
    Modal.enterPassword(this.handleConfirmTransaction, { hasCancel: true })
  }

  handleFingerprintSuccessCb = async () => {
    const _password = await getStorage(STORAGE_KEYS.PASSWORD)
    this.handleConfirmTransaction(encryptionPassword(_password))
  }

  handleConfirmTransaction = async (psw: string): Promise<void> => {
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
      const txHash = (res as Success<string>).result
      Toast.success(this.props.labels.sendSuccess)
      this.linkingAppCallBack(true)
      
      const type = this.props.navigation.getParam('type')
      if(type !== 'dappSend') {
        this.backToAccountDetail()
        return
      }
      // dapp send success callback
      this.dappSendSuccessCb(txHash)
    } else {
      Toast.info(res.error.message)
      this.linkingAppCallBack(false)
    }
  }

  backToAccountDetail = async () => {
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Assets' }),
        NavigationActions.navigate({ routeName: 'accountDetail' }),
      ],
    })
    await sleep(2000)
    this.props.navigation.dispatch(resetAction)
  }

  dappSendSuccessCb = (txHash: string) => {
    const dappName = this.props.navigation.getParam('name')
    const params = {
      type: 'dappSend',
      name: dappName,
      amount: this.sendAmount,
      extraData: this.extraData,
      hash: txHash
    }
    this.props.navigation.navigate('game', params)
  }

  // Linking open app callback
  linkingAppCallBack = (success: boolean) => {
    const { getParam } = this.props.navigation
    const type = getParam('type')
    if (type !== 'send') {
      return
    }
    const scheme = getParam('scheme')
    if (scheme) {
      Linking.canOpenURL(`${scheme}://`).then(res => {
        if (res) {
          Linking.openURL(`${scheme}://sendcb?success=${success}`)
        }
      })
    }
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
