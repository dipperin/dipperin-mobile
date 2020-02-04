import React from 'react'
import {View} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import {styles} from '../config'

interface Props {
  address?: string
}

const QRCodeDisplay: React.FC<Props> = ({address}) => {
  return (
    <View style={styles.qrcodeWrapper}>
        <QRCode
          value={address || ''}
          size={200}
          backgroundColor={'#f2f5f6'}
        />
      </View>
  )
}

export default QRCodeDisplay
