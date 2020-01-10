import {  FlatList } from "react-native"
import React from "react"
import TxItem from "./TxItem"

import TransactionModel from "Models/transaction"

interface Props {
    transactions: TransactionModel[]
}

const TxList = (props: Props) => {
    const { transactions } = props
    const getMoreTransaction=()=>{
        console.log(11111333)
    }
    const refresh=()=>{
        console.log(3222222222)
    }
    return (
        <FlatList
            refreshing={false}
            onRefresh={refresh}
            keyExtractor={(item:TransactionModel,index:number)=>item.from}
            onEndReached={getMoreTransaction}
            onEndReachedThreshold={0.1}
            data={transactions}
            renderItem={({ item }) => <TxItem transaction={item} />}
        />
    )
}

export default TxList