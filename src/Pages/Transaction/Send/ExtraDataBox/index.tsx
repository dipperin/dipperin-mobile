import React from 'react'
import { TouchableOpacity, View, Text, TextInput } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from './config'

interface Props {
  labels: I18nTransactionType
  value: string
  handleChange: (text: string) => void
  readonly?: boolean
}

class ExtraDataBox extends React.Component<Props> {
  render() {
    const { labels, value, handleChange, readonly } = this.props
    return (
      <TouchableOpacity style={styles.extraDataWrapper} activeOpacity={0.8}>
        <View style={styles.extraDataBar}>
          <Text style={styles.extraDataLabel}>
            {labels.remark}({labels.optional})
          </Text>
        </View>
        <TextInput
          style={styles.extraDataInput}
          value={value}
          onChangeText={handleChange}
          placeholder={labels.enterRemark}
          editable={!readonly}
        />
      </TouchableOpacity>
    )
  }
}

export default ExtraDataBox
