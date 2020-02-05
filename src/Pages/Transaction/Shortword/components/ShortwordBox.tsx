import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from '../config'

interface Props {
  shortword: string
  labels: I18nTransactionType
  onChange: (text: string) => void
}

const ShortwordBox: React.FC<Props> = ({ shortword, labels, onChange }) => {
  return (
    <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
      <View style={styles.toAddressLabel}>
        <Text style={styles.toAddressText}>{labels.shortword}</Text>
      </View>
      <TextInput
        style={styles.toAddressInput}
        value={shortword}
        onChangeText={onChange}
        placeholder={labels.enterRegisterShortword}
      />
    </TouchableOpacity>
  )
}

export default ShortwordBox
