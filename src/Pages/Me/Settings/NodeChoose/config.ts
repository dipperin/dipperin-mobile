import { VENUS, MERCURY } from 'Global/constants'
import { StyleSheet } from 'react-native'


export const dataSource = [
  {
    label: '金星',
    value: VENUS,
  },
  {
    label: '内网测试',
    value: MERCURY,
  }
]

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc',
  }
})
