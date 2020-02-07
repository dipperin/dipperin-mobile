import React from 'react'
import {
  View,
  StatusBar,
  EmitterSubscription,
  Keyboard,
  Text,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { observer, inject } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nTransactionType } from 'I18n/config'
import TransactionStore from 'Store/transaction'
import { styles, validateShortword } from './config'
import { Toast, Modal } from 'Components/PopupWindow'
import { fromUnitToDip, encryptionPassword } from 'Global/utils'
import WalletStore from 'Store/wallet'
import ContractStore from 'Store/contract'
import AccountStore from 'Store/account'
import { sleep, Result } from 'Global/utils'
import System from 'Store/System'
import { getStorage } from 'Db'
import { STORAGE_KEYS } from 'Global/constants'

import ShortwordBox from './components/ShortwordBox'
import TxFeeBox from './components/TxFeeBox'
import BtnBox from './components/BtnBox'

interface Props {
  navigation: NavigationStackScreenProps['navigation']
  labels: I18nTransactionType
  transaction?: TransactionStore
  wallet?: WalletStore
  contract?: ContractStore
  account?: AccountStore
  system?: System
}

@inject('transaction', 'wallet', 'contract', 'account', 'system')
@observer
export class Shortword extends React.Component<Props> {
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
    if (validateShortword(text)) {
      this.shortword = text
    }
  }

  @action handleChangeTxfee = (num: number) => {
    this.txFeeLevel = num
  }

  turnBack = async (timelimit: number = 0) => {
    await sleep(timelimit)
    this.props.navigation.goBack()
  }

  register = async (): Promise<Result<void>> => {
    const res = await this.props.contract!.registerShortword(
      this.shortword,
      10 ** this.txFeeLevel,
    )
    return res.success ? { ...res, result: undefined } : res
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

    const { isFingerPay } = this.props.system!
    if (isFingerPay) {
      Modal.FingerprintPopShow(
        {
          startHint: this.props.labels.pleaseEnterFingerprint,
          successHint: this.props.labels.proccessPay,
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
    Modal.enterPassword(this.handleConfirmTransaction, { hasCancel: true })
  }

  handleConfirmTransaction = async (psw: string) => {
    Modal.hide()
    Toast.loading()

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
    const { labels } = this.props
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#fff" />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.contentWrapper}
          resetScrollToCoords={{ x: 0, y: 0 }}>
          {/* {this.renderShortwordBox()} */}
          <ShortwordBox
            shortword={this.shortword}
            labels={labels}
            onChange={this.handleChangeShortword}
          />

          {/* {this.renderTxFeeBox()} */}
          <TxFeeBox
            txFee={this.txFee}
            txFeeLevel={this.txFeeLevel}
            labels={labels}
            onChange={this.handleChangeTxfee}
          />
        <Text style={styles.tips}>{labels.tips}</Text>
        </KeyboardAwareScrollView>
        {!this.keyboardShow && (
          <BtnBox labels={labels} onPress={this.handleSend} />
        )}
      </View>
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
