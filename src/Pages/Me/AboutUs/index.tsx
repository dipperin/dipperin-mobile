import React from 'react'
import LOGO from 'Assets/logo.png'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { styles } from './config'
import { NavigationScreenProp } from 'react-navigation'
import i18n from 'I18n'

interface Props {
  navigation: NavigationScreenProp<any>
}

export class AboutUs extends React.Component<Props> {
  render() {
    return (
      <View style={styles.box}>
        <View style={styles.topWrap}>
          <View style={styles.logoWrap}><Image source={LOGO} style={styles.logo} /></View>
          <View style={styles.appMsg}>
            <Text style={styles.appName}>{i18n.t('dipperin:me.walletProduction')}</Text>
            <Text style={styles.appVersion}>v1.0.0</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.userProtocolTouch}
          onPress={this.gotoUserProtocol}
        >
          <Text style={styles.userProtocolText}>{i18n.t('dipperin:me.userProtocol')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  gotoUserProtocol = () => {
    this.props.navigation.navigate('userProtocol')
  }
}

export default AboutUs
