import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NavigationScreenProp } from "react-navigation"

import { I18nAccountType } from 'I18n/config'
import { WithTranslation, withTranslation } from 'react-i18next'
interface Props {
    navigation: NavigationScreenProp<any>
    labels: I18nAccountType
}

class TransactionDetail extends React.Component<Props>{

    render() {
        const transaction = this.props.navigation.getParam('transaction')
        const isFromMe = this.props.navigation.getParam('isFromMe')
        const { value, timestamp, from, to, transactionHash, extraData, nonce } = transaction
        const { labels } = this.props
        return (
            <View style={styles.detailContainer}>
                <View style={styles.greySpace} />
                <Text style={styles.title}>{isFromMe ? labels.sent : labels.received}</Text>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.value}:</Text>
                    <Text style={styles.itemValue}>{value}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.timeStamp}:</Text>
                    <Text style={styles.itemValue}>{timestamp}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.nonce}:</Text>
                    <Text style={styles.itemValue}>{nonce}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.extraData}:</Text>
                    <Text style={styles.itemValue}>{extraData}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.from}:</Text>
                    <Text style={styles.itemValue}>{from}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.to}:</Text>
                    <Text style={styles.itemValue}>{to}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>{labels.hash}:</Text>
                    <Text style={styles.itemValue} numberOfLines={3}>{transactionHash}</Text>
                </View>
            </View>
        )
    }

}

const TransactionDetailWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
    const { t, navigation } = props
    const labels = t('dipperin:account') as I18nAccountType
    return <TransactionDetail labels={labels} navigation={navigation} />

}

export default withTranslation()(TransactionDetailWrap)

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
        maxWidth: 280
    }

})