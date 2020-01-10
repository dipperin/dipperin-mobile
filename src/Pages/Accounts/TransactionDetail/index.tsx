import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import TransactionModel from "Models/transaction"
interface Props {
    detail: TransactionModel
    navigation: NavigationScreenProp<any>
}

class TransactionDetail extends React.Component<Props>{

    render() {
        const transaction = this.props.navigation.getParam('transaction')
        const { value, timestamp, from, to, transactionHash, extraData, nonce } = transaction
        return (
            <View style={styles.detailContainer}>
                <View style={styles.greySpace} />
                <Text style={styles.title}>转账</Text>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>交易额:</Text>
                    <Text style={styles.itemValue}>{value}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>时间:</Text>
                    <Text style={styles.itemValue}>{timestamp}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Nonce:</Text>
                    <Text style={styles.itemValue}>{nonce}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>备注:</Text>
                    <Text style={styles.itemValue}>{extraData}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>发送方:</Text>
                    <Text style={styles.itemValue}>{from}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>接收方:</Text>
                    <Text style={styles.itemValue}>{to}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Hash:</Text>
                    <Text style={styles.itemValue} numberOfLines={3}>{transactionHash}</Text>
                </View>
            </View>
        )
    }

}

export default TransactionDetail

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
    },
    greySpace: {
        height: 10,
        backgroundColor: '#FAFBFC'
    },
    title: {
        marginLeft: 20,
        marginVertical: 20,
        fontSize: 18,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        minHeight: 45
    },
    itemLabel: {
        color: '#3C3E42',
        fontSize: 15,

    },
    itemValue: {
        color: '#3C3E42',
        fontSize: 15,
        maxWidth: 300
    }

})