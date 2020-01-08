import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import AccountModel from "Models/account"
import { withNavigation, NavigationScreenProp } from "react-navigation"
import AcountIcon from "Assets/account.png"
interface Props {
    account: AccountModel,
    navigation: NavigationScreenProp<any>


}

const AccountItem = (props: Props) => {
    const goDetail = () => {
        props.navigation.navigate("AccountDetail")
    }

    return (
        <TouchableOpacity
            onPress={goDetail}
            style={styles.item}
        >
            <View style={styles.itemLeft}>
                <Image source={AcountIcon} style={styles.accountLogo}/>
                <Text style={styles.txt}>name</Text>
            </View>
            <Text style={styles.txt} >444444 DIP</Text>
        </TouchableOpacity>
    )
}

export default withNavigation(AccountItem)

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#E8EBED',
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        height:80,
        paddingLeft:8,
        paddingRight:15,
        fontSize:16,
        marginBottom:10
    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
    },
    accountLogo:{
        width:40,
        height:40,
        marginRight:8
    },
    txt:{
        fontSize:16
    }
})