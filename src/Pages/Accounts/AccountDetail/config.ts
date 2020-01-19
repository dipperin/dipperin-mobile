import Collection from 'Assets/collection.png'
import Transfer from 'Assets/transfer.png'


import TransactionModel from 'Models/transaction'
import { TRANSACTION_STATUS_FAIL, TRANSACTION_STATUS_PENDING, TRANSACTION_STATUS_SUCCESS } from 'Global/constants'

export const TxIconConfig = {
    collection: Collection,
    transfer: Transfer,
}


export const getFailedTransactions = (transactions: TransactionModel[]) => {
    return transactions.filter(item => {
        return item.status === TRANSACTION_STATUS_FAIL
    })
}

export const getPendingAndFailedTransactions = (transactions: TransactionModel[]) => {
    return transactions.filter(item => {
        return item.status === TRANSACTION_STATUS_FAIL || item.status === TRANSACTION_STATUS_PENDING
    })
}
export interface TxRes {
    success: boolean
    tx_list: TxfromNode[]
    total_count: number
}
export interface TxfromNode {
    hash: string
    block_hash: string
    block_number: number
    tx_type: number
    to_address: string
    from_address: string
    nonce: number
    gasPrice: string
    cost: string
    amount: string
    stake: string
    vrf_hash: string
    priority: number
    extra_data: string
    created_at: string
    size: number
    timestamp: string
    position: number
}
export type Key = 'all' | 'sent' | 'received' | 'failed'

export const transferTxfromNode = (tx: TxfromNode) => {
    const { nonce, amount, from_address, to_address, extra_data, timestamp, hash, cost } = tx

    const param = {
        nonce: nonce + '',
        value: amount,
        from: from_address,
        to: to_address,
        extraData: extra_data,
        timeLock: 0,
        status: TRANSACTION_STATUS_SUCCESS,
        hashLock: '',
        transactionHash: hash,
        fee: cost,
        timestamp: Number(timestamp),
    }
    return new TransactionModel(param)

}



