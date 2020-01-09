import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Tabs } from "@ant-design/react-native"
import { TabsConfig } from "../config"
import TxList from "./TxList"

import TransactionStore from 'Store/transaction'
import AccountModel from "Models/account"

import { getSentTransactions, getReceivedTransactions, getFailedTransactions } from "../config"

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
                    <TxList transactions={transactions} />
                </View>
                <View style={styles.tabContent}>
                    <TxList transactions={getSentTransactions(transactions, address)} />
                </View>
                <View style={styles.tabContent}>
                    <TxList transactions={getReceivedTransactions(transactions, address)} />
                </View>
                <View style={styles.tabContent}>
                    <TxList transactions={getFailedTransactions(transactions)} />
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
        flex: 1
    }
})
