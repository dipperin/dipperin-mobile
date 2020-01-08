import { View, Text,StyleSheet } from "react-native"
import React from "react"
import TxRecord from "./TxRecord"
import AccountInfo from "./AccountInfo"
import { Button } from "@ant-design/react-native"


class AccountDetail extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FAFBFC" }}>
                <AccountInfo />
                <TxRecord />
                <View style={styles.btnBox}>
                    <Button style={styles.transfterBtn} type={'primary'}>转账</Button>
                    <Button style={styles.collectionBtn} type={'primary'} >收款</Button>
                </View>
            </View>
        )
    }
}

export default AccountDetail

const styles = StyleSheet.create({ 
    btnBox:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:85,
        backgroundColor:"#FAFBFC"
    },
    transfterBtn:{
        borderRadius:44,
        height:44,
        width:134,
        borderWidth:0,
        backgroundColor:"#1C77BC",
    },
    collectionBtn:{
        borderRadius:44,
        height:44,
        width:134,
        borderWidth:0,
        backgroundColor:"#107E4A",
    }
})