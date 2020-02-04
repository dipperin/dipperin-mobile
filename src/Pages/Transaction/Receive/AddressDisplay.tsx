import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './config'
import { Icon } from 'Components/Icon'

interface Props {
  address?: string
  onCopy: () => void
}

const AddressDisplay: React.FC<Props> = ({address, onCopy}) => {
  return (
    <View style={styles.addressWrapper}>
      <View style={styles.addressContent}>
        <Text style={styles.address}>
          {address || ''}
        </Text>
        <TouchableOpacity style={styles.copy} onPress={onCopy}>
          <Icon name={'fontAwesome|copy'} size={20} color={'#67686E'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddressDisplay
