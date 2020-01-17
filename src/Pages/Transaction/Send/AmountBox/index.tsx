import React from 'react'
import { TouchableOpacity, View, Text, TextInput } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from './config'

interface Props {
  labels: I18nTransactionType
  balance: string
  value: string
  handleChange: (text: string) => void
}

class AmountBox extends React.Component<Props> {
  render() {
    const { labels, balance, value, handleChange } = this.props
    return (
      <TouchableOpacity style={styles.sendAmountWrapper} activeOpacity={0.8}>
        <View style={styles.sendAmountBar}>
          <Text style={styles.sendAmountLabel}>{labels.sendAmount}</Text>
          <Text
            style={
              styles.balanceText
            }>{`${labels.balance}: ${balance} DIP`}</Text>
        </View>
        <TextInput
          style={styles.sendAmountInput}
          value={value}
          onChangeText={handleChange}
          placeholder={labels.enterAmount}
          keyboardType="numeric"
        />
      </TouchableOpacity>
    )
  }
}

export default AmountBox
