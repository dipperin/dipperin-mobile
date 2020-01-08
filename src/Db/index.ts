import { AccountObj } from 'Models/account'
import { WalletObj } from 'Models/wallet'


import {
    ACCOUNT_DB,
    DEFAULT_NET,
    TRANSACTION_DB,
    TRANSACTION_STATUS_SUCCESS,
    WALLET_DB,
} from 'Global/constants'

import { TransactionInterface } from 'Models/transaction'


import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export const storage = new Storage({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

export const setStorage = async (key: string, value: any) => {
    try {
        storage.save({
            key,
            data: value
        })
    } catch (_) {

    }
}

export const getStorage = async (key: string) => {
    try {
        return await storage.load({ key })
    } catch (_) {
    }
}



export const getAccount = async (): Promise<AccountObj[]> => {
    let res
    try {
        res = await storage.getAllDataForKey(ACCOUNT_DB)
    } catch (_) {
    }
    return res as AccountObj[]

}

export const updateSingleAccount = async (account: AccountObj) => {
    try {
        storage.save({
            key: ACCOUNT_DB,
            id: account.id + '',
            data: account
        })
    } catch (_) {

    }
}

export const insertAccount = async (account: AccountObj[] | AccountObj) => {
    if (Array.isArray(account)) {
        for (let index = 0; index < account.length; index++) {
            const element = account[index];
            await updateSingleAccount(element)
        }
    } else {
        await updateSingleAccount(account)
    }
}


export const removeAccount = async (id: number) => {
    try {
        storage.remove({
            key: ACCOUNT_DB,
            id: id + '',
        });
    } catch (_) {

    }
}

export const getTx = async (address: string, net: string = DEFAULT_NET): Promise<TransactionInterface[] | null> => {
    try {
        let res = await storage.getAllDataForKey(TRANSACTION_DB)
        return res.filter(item => {
            return (item.from === address && item.net === net)
                || (item.to === address && item.status === TRANSACTION_STATUS_SUCCESS && item.net === net)
                || (item.address === address.toLocaleLowerCase() && item.net === net)
                || (item.to === address.toLocaleLowerCase() && item.status === TRANSACTION_STATUS_SUCCESS && item.net === net)
        })
    } catch (_) {
        return null

    }
}


export const getContractTx = async (
    address: string,
    contractAddress: string,
    net: string = DEFAULT_NET
): Promise<TransactionInterface[] | null> => {
    try {
        const res = await storage.getAllDataForKey(TRANSACTION_DB)
        return res.filter(item => {
            return (item.from === address && item.to === contractAddress && item.net === net)
        })
    } catch (_) {
        return null
    }
}


export const insertTx = async (tx: TransactionInterface, net: string = DEFAULT_NET) => {
    const insertData = { ...tx, net }
    try {
        await storage.save({
            key: TRANSACTION_DB,
            id: tx.transactionHash + net,
            data: insertData

        })
    } catch (_) {

    }
}

export const updateTx = async (txHash: string, updateObj: any, net: string = DEFAULT_NET) => {
    try {
        await storage.save({
            key: TRANSACTION_DB,
            id: txHash + net,
            data: updateObj
        })
    } catch (_) {

    }

}

// /**
//  * insert wallet
//  */

export const insertWallet = async (walletObj: WalletObj) => {
    try {
        await storage.save({
            key: WALLET_DB,
            id: walletObj.walletId + '',
            data: walletObj
        })
    } catch (_) {

    }

}

// /**
//  * get walelt by walelt id
//  */

export const getWallet = async (walletId?: number): Promise<WalletObj | undefined> => {
    try {
        const res = await storage.load({
            key: WALLET_DB,
            id: walletId + ''
        })
        return res
    } catch (_) {
        return undefined
    }
}

// /**
//  * get active account id
//  */

export const getActiveId = async (walletId: number): Promise<string> => {
    const res = await storage.load({
        key: WALLET_DB,
        id: walletId + ''
    })
    return res ? res.activeAccountId as string : '1'
}

export const getErrTimes = async (walletId: number): Promise<number> => {
    const res = await storage.load({
        key: WALLET_DB,
        id: walletId + ''
    })
    return res ? res.unlockErrTimes : 0
}

export const getLockTime = async (walletId: number): Promise<string> => {
    const res = await storage.load({
        key: WALLET_DB,
        id: walletId + ''
    })
    return res ? res.lockTime : ''
}

export const updateLockTime = async (walletId: number, lockTime: string) => {
    try {
        const res = await storage.load({
            key: WALLET_DB,
            id: walletId + ''
        })
        if (res) {
            await storage.save({
                key: WALLET_DB,
                id: walletId + '',
                data: {
                    ...res,
                    lockTime
                }
            })
        }
    } catch (_) {

    }

}

export const updateActiveId = async (walletId: number, activeAccountId: string) => {
    try {
        const res = await storage.load({
            key: WALLET_DB,
            id: walletId + ''
        })
        if (res) {
            await storage.save({
                key: WALLET_DB,
                id: walletId + '',
                data: {
                    ...res,
                    activeAccountId
                }
            })
        }
    } catch (_) {

    }
}

export const updateErrTimes = async (walletId: number, unlockErrTimes: number = 0) => {
    try {
        const res = await storage.load({
            key: WALLET_DB,
            id: walletId + ''
        })
        if (res) {
            await storage.save({
                key: WALLET_DB,
                id: walletId + '',
                data: {
                    ...res,
                    unlockErrTimes
                }
            })
        }   
    } catch (_) {
        
    }

}


export const resetDB = () => {
    storage.clearMapForKey(ACCOUNT_DB)
    storage.clearMapForKey(TRANSACTION_DB)
    storage.clearMapForKey(WALLET_DB)
}