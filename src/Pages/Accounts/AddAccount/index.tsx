import { View, Text } from "react-native"
import { observable, action } from "mobx"
import { observer, inject } from "mobx-react"
import React from "react"
import { InputItem, List } from '@ant-design/react-native';
import { NavigationScreenProp } from "react-navigation"

import AccountStore from "Store/account"


interface Props{
    account: AccountStore
    navigation: NavigationScreenProp<any>
}
@inject('account')
@observer
class AddAccount extends React.Component<Props> {
    componentDidMount(){
        this.props.navigation.setParams({addAccount:this.addAcount})
    }
    @observable accountName: string = ''
    @action changeAccountName = (val: string) => {
        this.accountName = val
    }
    addAcount=async()=>{
        const { addAccount } = this.props.account
        await addAccount(this.accountName)
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#FAFBFC'}}>
                <List style={{marginTop:10}}>
                    <InputItem
                        clear
                        value={this.accountName}
                        onChange={this.changeAccountName}
                        placeholder="请输入账户名称"
                        maxLength={16}
                    >
                        账户名称
                     </InputItem>
                </List>
            </View>
        )
    }
}

export default AddAccount