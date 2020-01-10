import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import React from "react"
import { NavigationScreenProp,withNavigation } from "react-navigation"

import TransactionModel from "Models/transaction"
import Collection from "Assets/collection.png"


interface Props {
    transaction: TransactionModel
    navigation: NavigationScreenProp<any>
}
class TxItem extends React.Component<Props>{
    goDetail = () => {
        const { transaction } = this.props
        this.props.navigation.navigate('TransactionDetail', { transaction })
    }

    render() {
        const { transaction: { from, value, timestamp } } = this.props

        return (
            <TouchableOpacity
                onPress={this.goDetail}
            >
                <View style={styles.txItem}>
                    <View style={styles.left}>
                        <Image source={Collection} style={styles.icon} />
                        <View>
                            <Text >类型</Text>
                            <Text style={styles.txt}>from:{from}</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.dip}>{value} DIP</Text>
                        <Text style={styles.txt}>{timestamp}</Text>
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
        paddingTop: 3,
        color: '#A1A1A1'
    }
})