import { createIconSet } from 'react-native-vector-icons'

const glyphMap = {
  // 这里的数值是Unicode里面的十六进制值转换成十进制后的值,hom是自定义的关键词,用来确定图标名称
  shanchu: 59600, // 删除，垃圾桶icon
  saoma: 58976, // 扫一扫,扫码icon
  cha: 58986, // 叉
  fanhui: 59244, // 返回
  duoxuan: 58923, // 多选
  fenxiang: 59050, // 分享
  yanjing: 59362, // 眼睛
  danxuan: 58881, // 单选
  tianjia: 58936, // 添加
  xiangxia: 58943, // 向下
  xiangshang: 58942, // 向上
  xiangzuo: 58998, // 向左
  xiangyou: 59011, // 向右
  guanyuwomen: 58882, // 关于我们icon
  touxiang: 59485, // 头像
  faxian: 58895, // 发现
  shezhi: 59073, // 设置
  card: 58880, // 卡
}
// 这里的iconfont要和iconfont.ttf文件对应
const OIcon = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export { OIcon }



