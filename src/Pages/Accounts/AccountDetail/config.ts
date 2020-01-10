
import Collection from "Assets/collection.png"
import Transfer from "Assets/transfer.png"


import TransactionModel from "Models/transaction"
import { TRANSACTION_STATUS_FAIL ,TRANSACTION_STATUS_PENDING} from "Global/constants"

export const TabsConfig = [
    { title: '全部' },
    { title: '发送' },
    { title: '接收' },
    { title: '失败' },
];

export const TxIconConfig = {
    collection: Collection,
    transfer: Transfer,
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

export const getPendingAndFailedTransactions = (transactions: TransactionModel[]) => {
    return transactions.filter(item => {
        return item.status === TRANSACTION_STATUS_FAIL || item.status === TRANSACTION_STATUS_PENDING
    })
}