import React from 'react'
import { inject } from 'mobx-react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18CreateStep2Type } from 'I18n/config'

import BackUp from 'Assets/backup.png'
import WalletStore from 'Store/wallet'

interface Props {
  wallet?: WalletStore
  labels: I18CreateStep2Type
  navigation: NavigationScreenProp<any>
}

export const CreateStep2 = inject('wallet')(({ labels, navigation, wallet }: Props) => {

  const handNext = () => {
    navigation.navigate('createStep3')
  }
  const mnemonic = wallet!.mnemonic
  return (
    <View style={styles.wrap}>
      <View>
        <View style={styles.iconWrap}>
          <Image style={styles.icon} source={BackUp} resizeMode='contain' />
        </View>
        <Text style={styles.title}>{labels.title}</Text>
        <Text style={styles.intro}>{labels.intro}</Text>
        <Text style={styles.label}>{labels.menmonic}</Text>
        <Text style={styles.mnemonic}>{mnemonic}</Text>

      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity style={styles.btn} onPress={handNext} activeOpacity={0.7}>
          <Text style={styles.btnText}>{labels.btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

const CreateStep2Wrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:createStep2') as I18CreateStep2Type
  return <CreateStep2 labels={labels} navigation={navigation} />

}

export default withTranslation()(CreateStep2Wrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16.5,
    justifyContent: 'space-between'
  },
  iconWrap: {
    alignItems: 'center'
  },
  icon: {
    marginBottom: 10,
    width: 78,
    height: 78
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#393B42',
  },
  intro: {
    marginBottom: 10,
    fontSize: 12,
    color: '#767F86',
    lineHeight: 24
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    color: '#393B42'
  },
  mnemonic: {
    height: 96,
    padding: 16.5,
    paddingHorizontal: 24,
    fontSize: 17,
    color: '#393B42',
    borderColor: '#1C77BC',
    borderWidth: 1,
    borderRadius: 5
  },
  btnWrap: {
    height: 80,
  },
  btn: {
    marginHorizontal: 17,
    height: 44,
    borderRadius: 44,
    backgroundColor: '#1C77BC',
  },
  btnText: {
    lineHeight: 44,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }

})