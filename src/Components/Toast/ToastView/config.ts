import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

export const posConfigs: any = {
  bottom: {
    styleName: 'posBottom',
    startAnimHeight: 16,
    endAnimHeight: 34
  },
  center: {
    startAnimHeight: height / 2 - 50,
    endAnimHeight: height / 2 - 80
  },
  top: {
    startAnimHeight: 16,
    endAnimHeight: 34
  }
}










