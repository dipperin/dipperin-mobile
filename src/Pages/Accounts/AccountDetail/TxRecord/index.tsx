import { View, StyleSheet } from "react-native"
import { observer } from "mobx-react"
import React from "react"
import { Tabs } from "@ant-design/react-native"
import i18n from 'I18n'
import TxList from "./TxList"

import TransactionStore from 'Store/transaction'
import AccountModel from "Models/account"

import { getPendingAndFailedTransactions, getFailedTransactions } from "../config"
import { I18nAccountType } from 'I18n/config'
import { WithTranslation, withTranslation } from 'react-i18next'

interface Props extends WithTranslation {
    transaction: TransactionStore
    activeAccount: AccountModel
    labels: I18nAccountType
}

@observer
class TxRecord extends React.Component<Props>{

    render() {
        const { labels } = this.props
        const { transactions } = this.props.transaction!
        const { address } = this.props.activeAccount!
        const TabsConfig = [
            { title: i18n.t('dipperin:account.all')},
            { title: i18n.t('dipperin:account.sent') },
            { title: i18n.t('dipperin:account.received') },
            { title: i18n.t('dipperin:account.failed') },
        ];
        return (
            <View style={styles.tabsBox}>
                <Tabs
                    tabs={TabsConfig}
                    tabBarInactiveTextColor={"#5F6064"}
                    tabBarActiveTextColor={"#1C77BC"}
                    tabBarUnderlineStyle={styles.bottomLine}
                >
                    <View style={styles.tabContent}>
                        <TxList
                            keyIndex={'all'}
                            transactionsFromLocal={getPendingAndFailedTransactions(transactions)}
                            activeAccountaddress={address}
                            labels={labels}
                        />
                    </View>
                    <View style={styles.tabContent}>
                        <TxList
                            keyIndex={'sent'}
                            activeAccountaddress={address}
                            labels={labels}
                        />
                    </View>
                    <View style={styles.tabContent}>
                        <TxList
                            keyIndex={'received'}
                            activeAccountaddress={address}
                            labels={labels}
                        />
                    </View>
                    <View style={styles.tabContent}>
                        <TxList
                            keyIndex={'failed'}
                            transactionsFromLocal={getFailedTransactions(transactions)}
                            activeAccountaddress={address}
                            labels={labels}
                        />
                    </View>
                </Tabs>
            </View>
        )
    }
}


export default withTranslation()(TxRecord)

const styles = StyleSheet.create({
    tabsBox: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bottomLine: {
        backgroundColor: "#1C77BC"
    },
    tabContent: {
        flex: 1,
        backgroundColor: "#fff"
    }
})
