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
  value: string
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
export interface AppParams {
  page: number
  per_page: number
  order_by?: string
  as_and_desc?: string
}
export interface appsResourceInterface {
  name: string
  image_url: string
  classification: string

}
export interface appsRes {
  total_page: number
  total_count: number
  app_data: appsInterface[]
}


export interface fortuneInterface {
  sort: number
  address: string
  name: string
  dip_balance: number
  balance: number
}

export interface fortuneRes {
  total_count: number
  account_list: fortuneInterface[]
}

export interface FortuneParams {
  page: number
  per_page: number
}
