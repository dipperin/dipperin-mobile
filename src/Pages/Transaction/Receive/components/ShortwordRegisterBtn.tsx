import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { I18nTransactionType } from 'I18n/config'

import { styles } from '../config'

interface Props {
  labels: I18nTransactionType
  onTurn: () => void
}

const ShortwordRegisterBtn: React.FC<Props> = ({ labels, onTurn }) => {
  return (
    <TouchableOpacity
      style={styles.btnWrapper}
      activeOpacity={0.8}
      onPress={onTurn}>
      <View style={styles.btnMain}>
        <Text style={styles.btnText}>{labels.shortWordReceive}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ShortwordRegisterBtn
