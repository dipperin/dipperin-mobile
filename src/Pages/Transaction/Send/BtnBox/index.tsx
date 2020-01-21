import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from './config'

interface Props {
  labels: I18nTransactionType
  onPress: () => void
}

class BtnBox extends React.Component<Props> {
  render() {
    const { labels, onPress } = this.props
    return (
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={onPress}
        activeOpacity={0.8}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>{labels.send}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default BtnBox
