import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { Icon } from 'Components/Icon'
import { I18nTransactionType } from 'I18n/config'

import { styles } from '../config'

interface Props {
  labels: I18nTransactionType
  shortword: string
  onCopy: () => void
}

const ShortwordDisplay: React.FC<Props> = ({ labels, shortword, onCopy }) => {
  return (
    <View style={styles.ShortWordWrapper}>
      <View style={styles.ShortWordContent}>
        <Text
          style={styles.address}>{`${labels.shortword}: ${shortword}`}</Text>
        <TouchableOpacity style={styles.copyShortWord} onPress={onCopy}>
          <Icon name={'fontAwesome|copy'} size={20} color={'#67686E'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ShortwordDisplay
