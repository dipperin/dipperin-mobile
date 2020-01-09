import Award from "Assets/award.png"
import Collection from "Assets/collection.png"
import Transfer from "Assets/transfer.png"
import PwdCollection from "Assets/pwdCollection.png"
import PwdTransfer from "Assets/pwdTransfer.png"

import TransactionModel from "Models/transaction"
import { TRANSACTION_STATUS_FAIL } from "Global/constants"

export const TabsConfig = [
    { title: '全部', key: 'all' },
    { title: '发送', key: 'sent' },
    { title: '接收', key: 'received' },
    { title: '失败', key: 'failed' },
];

export const TxIconConfig = {
    award: Award,
    collection: Collection,
    transfer: Transfer,
    pwdCollection: PwdCollection,
    pwdTransfer: PwdTransfer
}

export const getSentTransactions = (transactions: TransactionModel[], address: string) => {
    return transactions.filter(item => {
        return item.from === address
    })
}

export const getReceivedTransactions = (transactions: TransactionModel[], address: string) => {
    return transactions.filter(item => {
        return item.to === address
    })
}

export const getFailedTransactions = (transactions: TransactionModel[]) => {
    return transactions.filter(item => {
        return item.status === TRANSACTION_STATUS_FAIL
    })
}