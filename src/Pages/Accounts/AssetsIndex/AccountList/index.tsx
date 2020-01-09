import React, { Fragment } from "react"
import {inject,observer} from "mobx-react"
import { View, Text, Image,ScrollView ,StyleSheet} from "react-native"
import AccountItem from "./account"
import AccountModel from "Models/account"
interface Props{
    accounts:AccountModel[]
    isEyeOpen:boolean
    changeActiveAccount:(id:string)=>void
}


const AccountList = (props:Props) => {
    const {accounts,isEyeOpen,changeActiveAccount} = props
    return (
        <View style={styles.listBox}>
            <Text style={styles.title}>资产</Text>
            <ScrollView style={styles.list}>
                {
                    accounts.map((item, index) => {
                        return <AccountItem account={item} key={index} isEyeOpen={isEyeOpen} changeActiveAccount={changeActiveAccount}/>
                    })
                }
                <View style={styles.space}/>
            </ScrollView>
        </View>
    )
}

export default AccountList

const styles=StyleSheet.create({
    listBox:{
        flex:1,
    },
    list:{
        flex:1,
    },
    space:{
        height:40,
    },
    title:{
        height:50,
        lineHeight:50,
        paddingLeft:10,
        fontSize:16,
        fontWeight:"bold",
        color:'#09182C'
    }
})