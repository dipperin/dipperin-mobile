import React from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, StatusBar } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18StartType } from 'I18n/config'

import Bg from 'Assets/start-bg.png'

interface Props {
  labels: I18StartType
  navigation: NavigationScreenProp<any>
}

export class Start extends React.Component<Props> {

  handleCreate = () => {
    this.props.navigation.navigate('create')
  }

  handleImport = () => {
    this.props.navigation.navigate('import')
  }

  render() {
    const { labels } = this.props
    return (
      <View style={styles.wrap}>
        <StatusBar backgroundColor='#204C88' />
        <ImageBackground source={Bg} style={styles.bg} >

          <TouchableOpacity style={styles.btn} onPress={this.handleCreate} activeOpacity={0.7}>
            <Text style={styles.text}>{labels.create}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.importBtn]} onPress={this.handleImport} activeOpacity={0.7}>
            <Text style={styles.text}>{labels.import}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}


const StartWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:start') as I18StartType
  return <Start labels={labels} navigation={navigation} />

}

export default withTranslation()(StartWrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  bg: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  btn: {
    marginBottom: 64,
    width: 153,
    height: 44,
    borderRadius: 44,
    backgroundColor: '#1C77BC',
  },
  importBtn: {
    backgroundColor: '#107E4A'
  },
  text: {
    lineHeight: 40,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})