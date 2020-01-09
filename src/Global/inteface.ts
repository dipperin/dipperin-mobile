import { ListItemProps } from '@ant-design/react-native/lib/list/ListItem';

export interface AntdListItemPropsType extends ListItemProps{
  keyWord?: string
  title: string
}

export interface contractInterface {
  adress: string
  name: string
  over: string
  holdings: string
}

export interface appsInterface {
  name: string
  balance: string
  user_count: number
  tx_count: number
  tx_amount: string
  image_url: string
  classification: string
}

export interface fortuneInterface {
  sort: number
  adress: string
  name: string
  dip_balance: number
}
