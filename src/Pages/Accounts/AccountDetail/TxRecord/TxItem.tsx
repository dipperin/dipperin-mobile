import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"

import TransactionModel from "Models/transaction"
import Award from "Assets/award.png"

interface Props {
    transaction: TransactionModel
}

const TxItem = (props: Props) => {
    const { transaction } = props
    return (
        <View style={styles.txItem}>
            <View style={styles.left}>
                <Image source={Award} style={styles.icon}/>
                <View>
                    <Text >类型</Text>
                    <Text style={styles.txt}>from:ccxxx4987123132</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.dip}>65655 DIP</Text>
                <Text style={styles.txt}>2020/02/02</Text>
            </View>
        </View>
    )
}

export default TxItem

const styles = StyleSheet.create({
    txItem:{
        flexDirection:'row',
        borderBottomColor:'#E8EBEE',
        borderBottomWidth:1,
        justifyContent:'space-between',
        alignItems:'center',
        height:68,
    },
    left:{
        flexDirection:'row',
    },
    right:{

    },
    icon:{
        width:43,
        height:43,
        marginRight:10
    },
    dip:{
        textAlign:"right"
    },
    txt:{
        paddingTop:3,
        color:'#A1A1A1'
    }
})