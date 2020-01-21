import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Slider from '@react-native-community/slider'
import { I18nTransactionType } from 'I18n/config'
import { styles } from './config'

interface Props {
  labels: I18nTransactionType
  fee: string
  value: number
  handleChange: (num: number) => void
}

class TxFeeBox extends React.Component<Props> {
  render() {
    const { labels, fee, value, handleChange } = this.props
    return (
      <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
        <View style={styles.txFeeBar}>
          <Text style={styles.txFeeLabel}>{labels.txFee}</Text>
          <Text style={styles.txFeeText}>{fee} DIP</Text>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={3}
          minimumTrackTintColor="#0099cb"
          step={1}
          onValueChange={handleChange}
        />
        <View style={styles.txFeeBottomBar}>
          <Text
            style={value >= 1 ? styles.activeFeeLevel : styles.defalutFeeLevel}>
            {labels.low}
          </Text>
          <Text
            style={value >= 2 ? styles.activeFeeLevel : styles.defalutFeeLevel}>
            {labels.middle}
          </Text>
          <Text
            style={value >= 3 ? styles.activeFeeLevel : styles.defalutFeeLevel}>
            {labels.high}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default TxFeeBox
