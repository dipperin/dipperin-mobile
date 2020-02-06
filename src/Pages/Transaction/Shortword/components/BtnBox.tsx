import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from '../config'

interface Props {
  labels: I18nTransactionType
  onPress: () => void
}

const BtnBox: React.FC<Props> = ({ onPress, labels }) => {
  return (
    <TouchableOpacity
      style={styles.btnWrapper}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.btnView}>
        <Text style={styles.btnText}>{labels.sendShortword}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BtnBox
