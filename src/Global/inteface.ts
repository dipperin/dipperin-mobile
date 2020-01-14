import { ListItemProps } from '@ant-design/react-native/lib/list/ListItem';

export interface AntdListItemPropsType extends ListItemProps{
  keyWord?: string
  title: string
}

export interface contractInterface {
  address: string
  contract_name: string
  dip_balance: string
  tx_count: number
  token_money_total: string
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
  success: boolean
  app: appsResourceInterface[]
  data: {
    app_data: appsInterface[]
    total_count: number
    total_pages: number
  }
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

export interface ContractParams {
  page: number
  per_page: number
  asc_and_desc: string
  order_by: string
}

export interface ContractRes {
  success: boolean,
  data: {
    contract_data: contractInterface[],
    total_count: number
    total_pages: number
  },
  info: string
}