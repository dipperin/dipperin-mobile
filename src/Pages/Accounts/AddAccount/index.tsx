import { View } from 'react-native'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import React from 'react'
import { InputItem, List } from '@ant-design/react-native';
import { NavigationScreenProp } from 'react-navigation'
import { I18nAccountType } from 'I18n/config'
import { WithTranslation, withTranslation } from 'react-i18next'

import AccountStore from 'Store/account'


interface Props {
    account?: AccountStore
    navigation: NavigationScreenProp<any>
    labels:I18nAccountType
}
@inject('account')
@observer
class AddAccount extends React.Component<Props> {
    componentDidMount() {
        this.props.navigation.setParams({ addAccount: this.addAcount })
    }
    @observable accountName: string = ''
    @action changeAccountName = (val: string) => {
        this.accountName = val
    }
    addAcount = async () => {
        const { addAccount } = this.props.account!
        await addAccount(this.accountName)
        this.props.navigation.goBack()
    }
    render() {
        const { labels } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: '#FAFBFC' }}>
                <List style={{ marginTop: 10 }}>
                    <InputItem
                        clear
                        value={this.accountName}
                        onChange={this.changeAccountName}
                        placeholder={`${labels.accountNamePlaceholder}`}
                        maxLength={16}
                    >
                        {labels.accountName}
                     </InputItem>
                </List>
            </View>
        )
    }
}


const AddAccountWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
    const { t, navigation } = props
    const labels = t('dipperin:account') as I18nAccountType
    return <AddAccount labels={labels} navigation={navigation} />
}

export default withTranslation()(AddAccountWrap)
