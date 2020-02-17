import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'

import { I18CreateStep1Type } from 'I18n/config'

import Security from 'Assets/security.png'

interface Props {
  labels: I18CreateStep1Type
  navigation: NavigationScreenProp<any>
}

export const CreateStep1 = ({ labels, navigation }: Props) => {

  const handNext = () => {
    navigation.navigate('createStep2')
  }
  return (
    <View style={styles.wrap}>
      <View>
        <View style={styles.iconWrap}>
          <Image style={styles.icon} source={Security} resizeMode='contain' />
        </View>
        <Text style={styles.title}>{labels.title}</Text>
        <Text style={styles.intro}>{labels.intro}</Text>
        <Text style={styles.item}>{labels.item1}</Text>
        <Text style={styles.item}>{labels.item2}</Text>
        <Text style={styles.item}>{labels.item3}</Text>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity style={styles.btn} onPress={handNext} activeOpacity={0.7}>
          <Text style={styles.btnText}>{labels.btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CreateStep1Wrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:createStep1') as I18CreateStep1Type
  return <CreateStep1 labels={labels} navigation={navigation} />

}

export default withTranslation()(CreateStep1Wrap)

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
    marginBottom: 32,
    fontSize: 12,
    color: '#767F86'
  },
  item: {
    marginBottom: 10,
    fontSize: 12,
    color: '#767F86' 
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