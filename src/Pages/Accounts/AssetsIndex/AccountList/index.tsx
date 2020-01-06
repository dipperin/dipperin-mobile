import React, { Fragment } from "react"
import { View, Text, Image } from "react-native"
import Account from "./account"
import AccountModel from "Models/account"
const mockAccount = new AccountModel(
    'sqEVSm4jZaNAegxA',
    "m/44'/709394'/0'/0/1",
    '0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37',
    ''
)

const AccountList = () => {
    const accounts = [mockAccount]
    return (
        <Fragment>
            <Text>资产</Text>
            <View>
                {
                    accounts.map((item, index) => {
                        return <Account account={item} key={index} />

                    })
                }
            </View>
        </Fragment>


    )
}

export default AccountList