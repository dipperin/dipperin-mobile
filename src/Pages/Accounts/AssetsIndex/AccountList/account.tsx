import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AccountModel from 'Models/account'
import { withNavigation, NavigationScreenProp } from 'react-navigation'
import { observer,inject } from 'mobx-react'
import { formatNumber } from 'Global/utils'
import { I18nAccountType } from 'I18n/config'

import AcountIcon from 'Assets/account.png'

export interface Props {
    account: AccountModel
    isEyeOpen: boolean
    changeActiveAccount: (id: string) => void
    navigation: NavigationScreenProp<any>
    labels: I18nAccountType
    activeAddress:string
}

@observer
export class AccountItem extends React.Component<Props>{
    goDetail = () => {
        const { account: { id }, changeActiveAccount,activeAddress } = this.props
        changeActiveAccount(id)
        this.props.navigation.navigate('accountDetail')
    }
    render() {
        const { account: { name, balance, id,address }, isEyeOpen, labels,activeAddress } = this.props
        const showName = name ? name : `${labels.accountName} ${id}`
        return (
            <TouchableOpacity
                onPress={this.goDetail}
            >
                <View style={[styles.item,activeAddress===address && styles.itemBorder]}>
                    <View style={styles.itemLeft}>
                        <Image source={AcountIcon} style={styles.accountLogo} />
                        <Text style={styles.txt}>{showName}</Text>
                    </View>
                    <Text style={styles.txt} >{isEyeOpen ? `${formatNumber(Number(balance), 6)} DIP` : '*******'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}


export default withNavigation(AccountItem)

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#E8EBED',
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        paddingLeft: 8,
        paddingRight: 15,
        fontSize: 16,
        marginBottom: 10,
    },
    itemBorder:{
        borderWidth:1,
        borderColor:'#B2DFEE'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountLogo: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    txt: {
        maxWidth: 160,
        fontSize: 16,
        color: '#393B42',
    },
})
