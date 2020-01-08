import { View, Text, Image, StyleSheet } from "react-native"
import React, { Fragment } from "react"
import AccountModel from 'Models/account'
import Accountlogo from "Assets/accountLogo.png"
import Eye from "Components/Eye"

import { formatNumber } from "Global/utils"

interface Props {
    account: AccountModel | undefined
    isEyeOpen: boolean
    setIsEyeOpen: (val: boolean) => void

}

const AccountInfo = (props: Props) => {
    const { isEyeOpen, setIsEyeOpen, account } = props
    return (
        <View style={styles.infoBox}>
            <Image source={Accountlogo} style={styles.accountLogo} />
            <View style={styles.nameBox}>
                <Text style={styles.name}>{account?.name}</Text>
                <Eye
                    isEyeOpen={isEyeOpen}
                    onPress={setIsEyeOpen}
                />
            </View>
            <Text style={styles.dip}>{isEyeOpen ? `${formatNumber(Number(account?.balance), 6)} DIP` : '*******'}</Text>
        </View>
    )

}

export default AccountInfo

const styles = StyleSheet.create({
    infoBox: {
        backgroundColor: "#fff",
        alignItems: 'center',
        height: 155,
        marginBottom: 10,
    },
    accountLogo: {
        marginTop: 10,
        width: 45,
        height: 45
    },
    nameBox: {
        marginTop: 8,
        flexDirection: 'row',
    },
    name: {
        marginLeft: 30,
        marginRight: 12,
        color: "#393B42",
        fontSize: 16,
    },
    dip: {
        marginTop: 8,
        fontSize: 22,
        color: "#393B42"
    }
})