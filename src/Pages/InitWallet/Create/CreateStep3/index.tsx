import React, { useState } from 'react'
import { inject } from 'mobx-react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NavigationScreenProp, ScrollView } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'
import { shuffle } from 'lodash'

import WalletStore from 'Store/wallet'
import { Toast } from 'Components/PopupWindow'
import { sleep } from 'Global/utils'

import { I18CreateStep3Type } from 'I18n/config'

import VerifyMnemonic from 'Assets/verify-mnemonic.png'

interface Props {
  wallet?: WalletStore
  labels: I18CreateStep3Type
  navigation: NavigationScreenProp<any>
}

interface ShuffleWords {
  word: string
  selected: boolean
}

const CreateStep3 = inject('wallet')(({ labels, navigation, wallet }: Props) => {

  const mnemonic = wallet!.mnemonic
  const mnemonicArr = mnemonic!.split(' ')
  const shuffleWords = shuffle(mnemonicArr).map(word => {
    return {
      selected: false,
      word
    }
  })
  const [shuffleWordsState, setShuffleWordsState] = useState<ShuffleWords[]>(shuffleWords)
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const handleSelectWrods = (item: ShuffleWords) => () => {
    if (item.selected) return
    item.selected = true
    selectedWords.push(item.word)
    setShuffleWordsState([...shuffleWordsState])
    setSelectedWords([...selectedWords])
  }

  const handleRemoveWords = (word: string) => () => {
    setSelectedWords(selectedWords.filter(item => item !== word))
    shuffleWordsState.forEach(item => {
      if (item.word === word) {
        item.selected = false
      }
    })
    setShuffleWordsState([...shuffleWordsState])
  }


  const handNext = async () => {
    if (selectedWords.join(' ') !== mnemonic) return
    const { destroyMnemonic } = wallet!
    if (destroyMnemonic) {
      Toast.loading()
      await sleep(100)
      const err = await destroyMnemonic()
      Toast.hide()
      if (!err) {
        navigation.navigate('wallet')
      }
    }
  }
  const disabled = selectedWords.join(' ') !== mnemonic
  return (
    <ScrollView style={styles.wrap}>
      <View>
        <View style={styles.iconWrap}>
          <Image style={styles.icon} source={VerifyMnemonic} resizeMode='contain' />
        </View>
        <Text style={styles.title}>{labels.title}</Text>
        <Text style={styles.intro}>{labels.intro}</Text>
        <Text style={styles.label}>{labels.menmonic}</Text>
        <View style={styles.mnemonic}>
          {
            selectedWords.map((word, index) => {
              return (
                <TouchableOpacity key={index} style={styles.mnemonicSelected} onPress={handleRemoveWords(word)}>
                  <Text style={styles.mnemonicWrodText}>{word}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={styles.optionsWrap}>
          {shuffleWordsState.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={[styles.option, item.selected && styles.selectedWords]} onPress={handleSelectWrods(item)}>
                <Text style={[styles.optionText, item.selected && styles.selectedText]}>{item.word}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity style={[styles.btn, disabled && styles.disabled]} onPress={handNext} activeOpacity={disabled ? 1 : 0.7}>
          <Text style={styles.btnText}>{labels.btnText}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
})

const CreateStep3Wrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:createStep3') as I18CreateStep3Type
  return <CreateStep3 labels={labels} navigation={navigation} />

}

export default withTranslation()(CreateStep3Wrap)

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16.5,
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
    marginBottom: 17,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 96,
    padding: 16.5,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 5
  },
  mnemonicSelected: {
    marginRight: 5,
  },
  mnemonicWrodText: {
    fontSize: 17,
    color: '#393B42',
  },
  optionsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  option: {
    marginBottom: 12,
    width: '21.7%',
    height: 28,
    backgroundColor: '#1C77BC',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedWords: {
    backgroundColor: '#E4E6EB'
  },
  optionText: {
    fontSize: 15,
    color: '#fff'
  },
  selectedText: {
    color: '#393B42'
  },
  btnWrap: {
    marginTop: 34,
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
  },
  disabled: {
    backgroundColor: '#999'
  }

})