import React, { Fragment } from "react"
import { View, Text, Image } from "react-native"
import AccountModel from "Models/account"
interface Props {
    account: AccountModel
}

const Account = (props: Props) => {
    const { account } = props
    return (
        <Fragment>
            <View>
                {/* <Image/> */}
                <Text>name</Text>
            </View>
            <Text>444444 DIP</Text>
        </Fragment>
    )
}

export default Account 