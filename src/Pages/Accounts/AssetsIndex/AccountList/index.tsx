import React, { Fragment } from "react"
import { View, Text, Image,ScrollView ,StyleSheet} from "react-native"
import AccountItem from "./account"
import AccountModel from "Models/account"
const mockAccount = new AccountModel(
    'sqEVSm4jZaNAegxA',
    "m/44'/709394'/0'/0/1",
    '0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37',
    ''
)

const AccountList = () => {
    const accounts = [mockAccount,mockAccount,mockAccount,mockAccount,mockAccount]
    return (
        <View style={styles.listBox}>
            <Text style={styles.title}>资产</Text>
            <ScrollView style={styles.list}>
                {
                    accounts.map((item, index) => {
                        return <AccountItem account={item} key={index} />

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