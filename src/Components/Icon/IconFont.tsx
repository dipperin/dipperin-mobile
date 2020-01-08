import { createIconSet } from 'react-native-vector-icons'

const glyphMap = {
  // the value is the Decimal unicode of the icon
  shanchu: 59600, // trush can
  saoma: 58976, // scan
  cha: 58986, // wrong icon
  fanhui: 59244, // back
  duoxuan: 58923, // checkbox
  fenxiang: 59050, // share
  yanjing: 59362, // eye
  danxuan: 58881, // radio
  tianjia: 59103, // add
  xiangxia: 58943, // down
  xiangshang: 58942, // up
  xiangzuo: 58998, // left
  xiangyou: 59011, // right
  guanyuwomen: 58882, // about us
  touxiang: 59485, // avatar
  faxian: 58895, // findings
  shezhi: 59073, // setting
  card: 58880, // card
  closedEye:58899, //closed eye
  openEye:58893, // open eye
}
const OIcon = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export { OIcon }



