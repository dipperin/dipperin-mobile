import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import React from "react"
import { NavigationScreenProp, withNavigation } from "react-navigation"
import moment from "moment"
import { getIsTxFromMe } from "Global/utils"

import TransactionModel from "Models/transaction"
import Collection from "Assets/collection.png"
import Transfer from "Assets/transfer.png"


interface Props {
    activeAccountaddress: string
    transaction: TransactionModel
    navigation: NavigationScreenProp<any>
}
class TxItem extends React.Component<Props>{
    goDetail = () => {
        const { transaction } = this.props
        this.props.navigation.navigate('TransactionDetail', { transaction })
    }

    render() {
        const { activeAccountaddress, transaction: { from, value, timestamp } } = this.props
        const showTime = timestamp ? moment(Math.floor(timestamp / 1000000)).format('YYYY/MM/DD') : ''
        const isFromMe = getIsTxFromMe(activeAccountaddress, from)
        return (
            <TouchableOpacity
                onPress={this.goDetail}
            >
                <View style={styles.txItem}>
                    <View style={styles.left}>
                        <Image source={isFromMe ? Transfer : Collection} style={styles.icon} />
                        <View>
                            <Text >{isFromMe ? '转账' : '收款'}</Text>
                            <Text style={styles.txt} numberOfLines={1} ellipsizeMode={'tail'}>{isFromMe?'To':'From'}: {from}</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.dip}>{value} DIP</Text>
                        <Text style={styles.txt}>{showTime}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}


export default withNavigation(TxItem)

const styles = StyleSheet.create({
    txItem: {
        flexDirection: 'row',
        borderBottomColor: '#E8EBEE',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 68,
    },
    left: {
        flexDirection: 'row',
    },
    right: {

    },
    icon: {
        width: 43,
        height: 43,
        marginRight: 10
    },
    dip: {
        textAlign: "right"
    },
    txt: {
        maxWidth: 200,
        paddingTop: 3,
        color: '#A1A1A1'
    }
})