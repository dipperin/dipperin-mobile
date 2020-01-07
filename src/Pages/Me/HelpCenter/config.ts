import { StyleSheet } from "react-native"
import { ListItemProps } from '@ant-design/react-native/lib/list/ListItem';

export interface ListItemPropsType extends ListItemProps {
  id: string
  title: string
  detail: string
}


export const dataSource = [
  {
    id: '1',
    title: '什么是DIP钱包？',
    detail: '解释DIP钱包是什么'
  },
  {
    id: '2',
    title: '如何创建DIP钱包？',
    detail: '如何创建DIP钱包详细说明'
  },
  {
    id: '3',
    title: '什么是钱包助记词？',
    detail: '解释什么是钱包助记词'
  },
  {
    id: '4',
    title: '助记词重要还是钱包密码重要？',
    detail: '助记词比钱包密码重要'
  }
]


export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc'
  },

  subTitle: {
    paddingLeft: 14,
    paddingRight: 14,
    lineHeight: 40,
    fontSize: 12,
    color: '#333',
    backgroundColor: '#fafbfc'
  },

  itemText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 58
  }
})
