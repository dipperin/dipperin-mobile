import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { inject, observer } from "mobx-react"
import TxRecord from "./TxRecord"
import AccountInfo from "./AccountInfo"
import { Button } from "@ant-design/react-native"
import { NavigationScreenProp } from "react-navigation"

import TransactionStore from 'Store/transaction'
import AccountStore from "Store/account"
import SystemStore from "Store/System"


interface Props {
    transaction: TransactionStore
    account: AccountStore
    system: SystemStore
    navigation: NavigationScreenProp<any>
}

@inject('account', 'system', 'transaction')
@observer
class AccountDetail extends React.Component<Props> {
    navigate=(routeName:string)=>()=>{
        this.props.navigation.navigate(routeName)
    }
    render() {
        console.log(1111111, this.props.transaction.transactions)
        const { activeAccount } = this.props.account
        const { isEyeOpen, setIsEyeOpen } = this.props.system
        return (
            <View style={{ flex: 1, backgroundColor: "#FAFBFC" }}>
                <AccountInfo account={activeAccount} isEyeOpen={isEyeOpen} setIsEyeOpen={setIsEyeOpen} />
                <TxRecord transaction={this.props.transaction} activeAccount={activeAccount!} />
                <View style={styles.btnBox}>
                    <Button style={styles.transfterBtn} type={'primary'} onPress={this.navigate('send')}>转账</Button>
                    <Button style={styles.collectionBtn} type={'primary'} onPress={this.navigate('receive')}>收款</Button>
                </View>
            </View>
        )
    }
}

export default AccountDetail

const styles = StyleSheet.create({
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 85,
        backgroundColor: "#FAFBFC"
    },
    transfterBtn: {
        borderRadius: 44,
        height: 44,
        width: 134,
        borderWidth: 0,
        backgroundColor: "#1C77BC",
    },
    collectionBtn: {
        borderRadius: 44,
        height: 44,
        width: 134,
        borderWidth: 0,
        backgroundColor: "#107E4A",
    }
})