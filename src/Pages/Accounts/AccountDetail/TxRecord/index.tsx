import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Tabs } from "@ant-design/react-native"
import { TabsConfig } from "../config"
import TxList from "./TxList"

import TransactionStore from 'Store/transaction'
import AccountModel from "Models/account"
import TransactionModel from "Models/transaction"

import { getSentTransactions, getReceivedTransactions, getFailedTransactions } from "../config"

interface Props {
    transaction: TransactionStore
    activeAccount: AccountModel
}
const nonce = '1'
const value = '1'
const from = '0xaaa'
const to = '0x11111'
const extraData = 'aaaa'
const timeLock = 1
const status = 'pending'
const hashLock = ''
const transactionHash = '0x111112'
const fee = '1'
const timestamp = 111

const mockTx = {
  nonce,
  value,
  from,
  to,
  extraData,
  timeLock,
  status,
  hashLock,
  transactionHash,
  fee,
  timestamp
}
const tx = new TransactionModel(mockTx)

const TxRecord = (props: Props) => {

    const { transactions } = props.transaction!
    const { address } = props.activeAccount!
    const txs=[tx,tx,tx,tx,tx,tx,tx,tx]
    return (
        <View style={styles.tabsBox}>
            <Tabs
                tabs={TabsConfig}
                tabBarInactiveTextColor={"#5F6064"}
                tabBarActiveTextColor={"#1C77BC"}
                tabBarUnderlineStyle={styles.bottomLine}
            >
                <View style={styles.tabContent}>
                    <TxList transactions={txs} />
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
        flex: 1,
        backgroundColor: "#fff"
    }
})
