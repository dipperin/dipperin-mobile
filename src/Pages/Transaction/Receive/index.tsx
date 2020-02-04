import React from 'react'
import {
  View,
  StatusBar,
  Clipboard,
} from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nTransactionType } from 'I18n/config'

import { styles } from './config'
import { observer, inject } from 'mobx-react'
import AccountStore from 'Store/account'
import ContractStore from 'Store/contract'
import { computed, reaction } from 'mobx'

import { Toast } from 'Components/PopupWindow'
import ContentHeader from './components/ContentHeader'
import AddressDisplay from './components/AddressDisplay'
import QRCodeDisplay from './components/QRCodeDisplay'
import ShortwordDisplay from './components/ShortwordDisplay'
import ShortwordRegisterBtn from './components/ShortwordRegisterBtn'

interface Props {
  navigation: NavigationStackScreenProps['navigation']
  labels: I18nTransactionType
  account?: AccountStore
  contract?: ContractStore
}

@inject('account', 'contract')
@observer
export class Receive extends React.Component<Props> {
  @computed get shortword() {
    const addr = this.props.account!.activeAccount!.address
    const sw = this.props.contract!.shortwordMap.get(addr)
    return sw || ''
  }

  componentDidMount() {
    if (this.shortword === '') {
      const addr = this.props.account!.activeAccount!.address
      this.queryShortword(addr)
    }
    this.setShareContent(this.shortword)
    reaction(
      () => this.shortword,
      (shortword: string) => {
        this.setShareContent(shortword)
      },
    )
  }

  setShareContent = (shortword: string) => {
    this.props.navigation.setParams({
      shareMsg: `address: ${this.props.account!.activeAccount!.address};${
        shortword ? 'short word: ' + shortword : ''
      }`,
    })
  }

  queryShortword = async (addr: string) => {
    const res = await this.props.contract!.queryShortwordByAddr(addr)
    console.log(res)
  }

  handleClose = () => {
    this.props.navigation.goBack()
  }

  turnToShortword = () => {
    this.props.navigation.navigate('shortword')
  }

  copyToClickboard = () => {
    Clipboard.setString(this.props.account!.activeAccount!.address)
    Toast.success(this.props.labels.copySuccess)
  }

  copyShortwordToClickboard = () => {
    Clipboard.setString(this.shortword)
    Toast.success(this.props.labels.copySuccess)
  }

  render() {
    const { labels } = this.props
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#1C77BC" barStyle="light-content" />
        <View style={styles.mainContent}>
          <ContentHeader labels={labels} />

          <AddressDisplay
            address={this.props.account!.activeAccount?.address}
            onCopy={this.copyToClickboard}
          />

          <QRCodeDisplay address={this.props.account!.activeAccount!.address} />

          {!!this.shortword && (
            <ShortwordDisplay
              labels={labels}
              shortword={this.shortword}
              onCopy={this.copyShortwordToClickboard}
            />
          )}
        </View>

        {!this.shortword && (
          <ShortwordRegisterBtn labels={labels} onTurn={this.turnToShortword} />
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
  return <Receive labels={labels} navigation={navigation} />
}

export default withTranslation()(Wrapped)
