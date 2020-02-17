import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {OIcon} from './IconFont'
import React, {Component} from 'react'

const iconMap = {
  fontAwesome: FontAwesome, // 原来原生的图标名称
  icon: OIcon, // 自定义图标名称
}

interface Props {
  name: string
  size: number
  color: string
}

class Icon extends Component<Props> {

  render() {
    const {name, size, color} = this.props
    if (!name.includes('|')) {
      throw new Error('name 解析错误！')
    }
    let nameArr = name.split('|')
    let fontlib = nameArr[0]
    let font = nameArr[1]
    let CustomIcon = iconMap[fontlib as keyof typeof iconMap]
    if (!CustomIcon) {throw new Error('没有找到匹配的font库，请review代码！')}
    return (
      <CustomIcon name={font} size={size} color={color}/>
    )
  }
}

export {Icon}

