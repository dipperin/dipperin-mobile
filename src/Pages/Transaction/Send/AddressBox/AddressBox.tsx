import React from 'react'
import { TouchableOpacity, View, Text, TextInput } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from '../config'

interface Props {
  labels: I18nTransactionType
  value: string
  handleChange: (text: string) => void
}

class AddressBox extends React.Component<Props> {
  render() {
    const { labels, value, handleChange } = this.props
    return (
      <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
        <View style={styles.toAddressLabel}>
          <Text style={styles.toAddressText}>{labels.toAddress}</Text>
        </View>
        <TextInput
          style={styles.toAddressInput}
          value={value}
          onChangeText={handleChange}
          placeholder={labels.enterAddressOrWord}
        />
      </TouchableOpacity>
    )
  }
}

export default AddressBox
