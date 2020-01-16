import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import AccountModel from 'Models/account'
import Accountlogo from 'Assets/accountLogo.png'
import Eye from 'Components/Eye'
import { I18nAccountType } from 'I18n/config'

import { formatNumber } from 'Global/utils'

interface Props {
    account: AccountModel | undefined
    isEyeOpen: boolean
    setIsEyeOpen: (val: boolean) => void
    labels:I18nAccountType

}

const AccountInfo = (props: Props) => {
    const { isEyeOpen, setIsEyeOpen, account ,labels} = props
    return (
        <View style={styles.infoBox}>
            <Image source={Accountlogo} style={styles.accountLogo} />
            <View style={styles.nameBox}>
                <Text style={styles.dip}>{isEyeOpen ? `${formatNumber(Number(account?.balance), 6)} DIP` : '*******'}</Text>
                <Eye
                    isEyeOpen={isEyeOpen}
                    onPress={setIsEyeOpen}
                />
            </View>

        </View>
    )

}

export default AccountInfo

const styles = StyleSheet.create({
    infoBox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 110,
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
        alignItems:'center',
    },
    dip: {
        marginLeft:20,
        marginRight:10,
        fontSize: 22,
        color: '#393B42',

    }
})