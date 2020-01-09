export enum Tabs {
  WALLET = 'wallet',
  DISCOVERY = 'discovery',
  ME = 'me'
}

/**
 * node net
 */

export const DEFAULT_NET = 'venus'
export const VENUS = 'venus'
export const MERCURY = 'mercury'

/**
 * Language type
 */
export const LANGUAGE = {
  ZH: 'zh',
  EN: 'en'
}

/**
 * DB
 */

export const ACCOUNT_DB = 'account'
export const TRANSACTION_DB = 'transaction'
export const WALLET_DB = 'wallet'
export const CONTRACT_DB = 'contract'
export const VM_CONTRACT_DB = 'vmContrat'
export const FAVORITE_CONTRACT = 'favoriteContract'
export const OWNER_DB = 'owner'
export const RECEIPT_DB = 'receipt'
export const MINE_DB = 'mine'
export const CONFIG_DB = 'config'


/**
 * Transaction
 */

export const DEFAULT_HASH_LOCK = ''
export const DEFAULT_CHAIN_ID = '0x02'

export const TRANSACTION_STATUS_PENDING = 'pending'
export const TRANSACTION_STATUS_SUCCESS = 'success'
export const TRANSACTION_STATUS_FAIL = 'fail'

export const TRANSACTION_LIMIT_TIME = 600000

/**
 * StorageKey
 */
export enum STORAGE_KEYS {
  WALLET_ID = 'walletId',
  NET = 'net',
  PASSWORD_TIP = 'passwordTip'
}

/**
 * Wallet
 */

export const DEFAULT_ERR_TIMES = 0
export const DEFAULT_LOCK_TIME = ''
export const LOCKTIMES = 8 // wrong password times

/**
 * Account
 */

export const ACCOUNTS_PATH = `m/44'/709394'/0'/0`
export const FIRST_ACCOUNT_ID = '1'



/**
 * net
 */
export enum NET  {
  VENUS = 'venus',
  TEST =  'test'
}

export const NET_HOST = {
  [NET.VENUS]: 'http://14.17.65.122:3035',
  [NET.TEST]: 'http://172.16.5.201:3035'
}

export const CHAIN_ID_DIC = {
  [NET.VENUS]: '0x02',
  [NET.TEST]: '0x640'
}