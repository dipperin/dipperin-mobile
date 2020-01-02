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