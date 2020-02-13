import { View, StyleSheet } from 'react-native'
import React from 'react'
import { inject, observer } from 'mobx-react'
import TxRecord from './TxRecord'
import AccountInfo from './AccountInfo'
import { Button } from '@ant-design/react-native'
import { NavigationEvents } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'

import { I18nAccountType } from 'I18n/config'
import { WithTranslation, withTranslation } from 'react-i18next'

import TransactionStore from 'Store/transaction'
import AccountStore from 'Store/account'
import SystemStore from 'Store/System'


export interface Props {
    transaction?: TransactionStore
    account?: AccountStore
    system?: SystemStore
    navigation: NavigationStackScreenProps['navigation']
    labels: I18nAccountType
}

@inject('account', 'system', 'transaction')
@observer
export class AccountDetail extends React.Component<Props> {
    navigate = (routeName: string) => () => {
        this.props.navigation.navigate(routeName)
    }
    didFocus = () => {
        const { activeAccount } = this.props.account!
        const title = activeAccount!.name ? activeAccount!.name : `${this.props.labels.accountName} ${activeAccount!.id}`
        this.props.navigation.setParams({ title: title })
    }
    render() {
        const { activeAccount } = this.props.account!
        const { isEyeOpen, setIsEyeOpen } = this.props.system!
        const { labels } = this.props
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onDidFocus={this.didFocus}
                />
                <AccountInfo
                    account={activeAccount}
                    isEyeOpen={isEyeOpen}
                    setIsEyeOpen={setIsEyeOpen}
                    labels={this.props.labels}
                />
                <TxRecord
                    transaction={this.props.transaction!}
                    activeAccount={activeAccount!}
                    labels={this.props.labels}
                />
                <View style={styles.btnBox}>
                    <Button style={styles.transfterBtn} type={'primary'} onPress={this.navigate('send')}>{labels.send}</Button>
                    <Button style={styles.collectionBtn} type={'primary'} onPress={this.navigate('receive')}>{labels.receive}</Button>
                </View>
            </View>
        )
    }
}
const AccountDetailWrap = (props: WithTranslation & { navigation: NavigationStackScreenProps['navigation'] }) => {
    const { t, navigation } = props
    const labels = t('dipperin:account') as I18nAccountType
    return <AccountDetail labels={labels} navigation={navigation} />

}

export default withTranslation()(AccountDetailWrap)

const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: '#FAFBFC' },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 85,
        backgroundColor: '#FAFBFC',
    },
    transfterBtn: {
        borderRadius: 44,
        height: 44,
        width: 134,
        borderWidth: 0,
        backgroundColor: '#1C77BC',
    },
    collectionBtn: {
        borderRadius: 44,
        height: 44,
        width: 134,
        borderWidth: 0,
        backgroundColor: '#107E4A',
    },
})
