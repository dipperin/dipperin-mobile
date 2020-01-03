import React from 'react'
import { Switch } from '@ant-design/react-native'
import System from "Store/System"
import { StyleSheet } from "react-native"
import { AntdListItemPropsType } from 'Global/inteface'
import { VENUS } from 'Global/constants'

export const FINGER_UNLOCK = 'fingerUnLock'
export const FINGER_PAY = 'fingerPay'
export const LANGEUAGE = 'language'
export const NODE_CHECKED = 'nodeChecked'


interface ListItemMainTypes {
  extraOnChange?: (key: string, value: boolean) => void
  onChangeItem?: (keyWord: string) => void
}

export const settingListItemsMain = (system: System, options: ListItemMainTypes): AntdListItemPropsType[] => [
  {
    title: '指纹解锁',
    extra: (
      <Switch
        checked={system.fingerUnLock}
        onChange={(_value) => options.extraOnChange && options.extraOnChange(FINGER_UNLOCK, _value)}
      />
    )
  },
  {
    title: '指纹支付',
    extra: (
      <Switch
        checked={system.fingerPay}
        onChange={(_value) => options.extraOnChange && options.extraOnChange(FINGER_PAY, _value)}
      />
    )
  },
  {
    title: '修改密码',
    arrow: 'horizontal',
    onPress: () => options.onChangeItem && options.onChangeItem("modifyPassWord")
  },
]

export const settingListItemsExt = (system: System, options: ListItemMainTypes):  AntdListItemPropsType[] => [
  {
    title: '语言',
    extra: system.curLanguage === 'en' ? 'English' : '简体中文',
    arrow: 'horizontal',
    onPress: () => options.onChangeItem && options.onChangeItem(LANGEUAGE)
  },
  {
    title: '节点选择',
    extra: system.curSystemNodeAddr === VENUS ? '远程节点-金星' : '远程节点-内侧网',
    arrow: 'horizontal',
    onPress: () => options.onChangeItem &&  options.onChangeItem(NODE_CHECKED)
  }
]

export const styles = StyleSheet.create({
  listItem: {
    lineHeight: 54
  }
})
