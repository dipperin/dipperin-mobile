import { createIconSet } from 'react-native-vector-icons'

const glyphMap = {
  // 这里的数值是Unicode里面的十六进制值转换成十进制后的值,hom是自定义的关键词,用来确定图标名称
  aboutUs: 58882,
  avatar: 59485,
  discover: 58895,
  setting: 59073,
  card: 58880
}
// 这里的iconfont要和iconfont.ttf文件对应
const OIcon = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export { OIcon }



