import React from 'react'
import { View, Text, TouchableOpacity, Slider } from 'react-native'
import { I18nTransactionType } from 'I18n/config'
import { styles } from '../config'

interface Props {
  labels: I18nTransactionType
  txFee: string
  txFeeLevel: number
  onChange: (num: number) => void
}

const TxFeeBox: React.FC<Props> = ({ txFee, txFeeLevel, labels, onChange }) => {
  return (
    <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
      <View style={styles.txFeeBar}>
        <Text style={styles.txFeeLabel}>{labels.txFee}</Text>
        <Text style={styles.txFeeText}>{`${txFee} DIP`}</Text>
      </View>
      <Slider
        minimumValue={1}
        maximumValue={3}
        step={1}
        onValueChange={onChange}
      />
      <View style={styles.txFeeBottomBar}>
        {[
          [1, labels.low],
          [2, labels.middle],
          [3, labels.high],
        ].map(el => (
          <Text
            style={
              txFeeLevel >= el[0]
                ? styles.activeFeeLevel
                : styles.defalutFeeLevel
            }>
            {el[1]}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  )
}

export default TxFeeBox
