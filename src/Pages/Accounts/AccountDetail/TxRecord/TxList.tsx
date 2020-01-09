import { View, Text, StyleSheet ,ScrollView} from "react-native"
import React from "react"
import TxItem from "./TxItem"

import TransactionModel from "Models/transaction"

interface Props{
    transactions:TransactionModel[]
}

const TxList=(props:Props)=>{
    const { transactions } = props
    return (
        <ScrollView>
            {transactions.map((item,index)=>{
                return <TxItem transaction={item} key={index}/>
            })}
            <View style={{height:40}}/>
        </ScrollView>
    )
}

export default TxList