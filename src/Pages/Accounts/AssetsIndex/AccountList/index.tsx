import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import AccountItem from './account'
import AccountModel from 'Models/account'
import { I18nAccountType } from 'I18n/config'
interface Props {
    accounts: AccountModel[]
    isEyeOpen: boolean
    changeActiveAccount: (id: string) => void
    labels: I18nAccountType
    activeAddress:string
}

const AccountList = (props: Props) => {
    const { accounts, isEyeOpen, changeActiveAccount, labels,activeAddress } = props
    return (
        <View style={styles.listBox}>
            <Text style={styles.title}>{labels.assets}</Text>
            <ScrollView style={styles.list}>
                {
                    accounts.map((item, index) => {
                        return <AccountItem
                            account={item}
                            key={index}
                            isEyeOpen={isEyeOpen}
                            changeActiveAccount={changeActiveAccount}
                            labels={labels}
                            activeAddress={activeAddress}
                        />
                    })
                }
                <View style={styles.space} />
            </ScrollView>
        </View>
    )
}

export default AccountList

const styles = StyleSheet.create({
    listBox: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    space: {
        height: 40,
    },
    title: {
        height: 50,
        lineHeight: 50,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#09182C',
    },
})
