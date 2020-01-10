import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Tabs } from "@ant-design/react-native"
import { TabsConfig } from "../config"
import TxList from "./TxList"

import TransactionStore from 'Store/transaction'
import AccountModel from "Models/account"
import TransactionModel from "Models/transaction"

import { getPendingAndFailedTransactions, getFailedTransactions } from "../config"

interface Props {
    transaction: TransactionStore
    activeAccount: AccountModel
}


const TxRecord = (props: Props) => {
    const { transactions } = props.transaction!
    const { address } = props.activeAccount!
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
                        transactionsFromLocal={getPendingAndFailedTransactions(transactions)}
                        activeAccountaddress={address}
                    />
                </View>
                <View style={styles.tabContent}>
                    <TxList activeAccountaddress={address} />
                </View>
                <View style={styles.tabContent}>
                    <TxList activeAccountaddress={address} />
                </View>
                <View style={styles.tabContent}>
                    <TxList
                        transactionsFromLocal={getFailedTransactions(transactions)}
                        activeAccountaddress={address}
                    />
                </View>
            </Tabs>
        </View>
    )
}

export default TxRecord

const styles = StyleSheet.create({
    tabsBox: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10
    },
    bottomLine: {
        backgroundColor: "#1C77BC"
    },
    tabContent: {
        flex: 1,
        backgroundColor: "#fff"
    }
})
