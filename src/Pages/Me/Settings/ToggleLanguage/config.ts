import { LANGUAGE } from 'Global/constants'
import { StyleSheet } from 'react-native'
import i18n from 'I18n'

export const dataSource = [
  {
    label: i18n.t('dipperin:me.simplifiedChinese'),
    value: LANGUAGE.ZH,
  },
  {
    label: i18n.t('dipperin:me.English'),
    value: LANGUAGE.EN,
  }
]

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc',
  }
})

