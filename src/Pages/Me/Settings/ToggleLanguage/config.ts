import { LANGUAGE } from 'Global/constants'
import { StyleSheet } from 'react-native'


export const dataSource = [
  {
    label: '简体中文',
    value: LANGUAGE.ZH,
  },
  {
    label: 'English',
    value: LANGUAGE.EN,
  }
]

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc',
  }
})

