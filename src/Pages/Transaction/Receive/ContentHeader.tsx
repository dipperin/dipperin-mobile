import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './config'
import { I18nTransactionType } from 'I18n/config'

interface Props {
  labels: I18nTransactionType
}

const ContentHeader: React.FC<Props> = ({ labels }) => {
  return (
    <View style={styles.contentTitleWrapper}>
      <Text style={styles.contentTitle}>{labels.qrCode}</Text>
    </View>
  )
}

export default ContentHeader
