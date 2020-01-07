import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Tabs } from "@ant-design/react-native"
import {TabsConfig } from "../config"
import TxList  from "./TxList"


import TransactionModel from "Models/transaction"


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



const TxRecord = () => {
    const tx = new TransactionModel(mockTx)
    const txs = [tx,tx,tx,tx,tx,tx]

    return (
        <View style={styles.tabsBox}>
            <Tabs
                tabs={TabsConfig}
                tabBarInactiveTextColor={"#5F6064"}
                tabBarActiveTextColor={"#1C77BC"}
                tabBarUnderlineStyle={styles.bottomLine}
            >
                <View style={styles.tabContent}>
                    <TxList transactions={txs}/>
                </View>
                <View style={styles.tabContent}>
                    <Text>Content of Second Tab</Text>
                </View>
                <View style={styles.tabContent}>
                    <Text>Content of Third Tab</Text>
                </View>
                <View style={styles.tabContent}>
                    <Text>Content of fourth Tab</Text>
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
