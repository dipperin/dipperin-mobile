import { AccountObj } from 'Models/account'
import { ContractObj } from 'Models/contract'
import { WalletObj } from 'Models/wallet'
import ReceiptModel from 'Models/receipt'


import {
    ACCOUNT_DB,
    CONTRACT_DB,
    DEFAULT_NET,
    FAVORITE_CONTRACT,
    OWNER_DB,
    TRANSACTION_DB,
    TRANSACTION_STATUS_SUCCESS,
    WALLET_DB,
    VM_CONTRACT_DB,
    RECEIPT_DB,
    MINE_DB // FIXME: to remove
    // CONFIG_DB
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
    } catch(_) {
        
    }
}

export const getStorage = async (key: string) => {
    try {
       return await storage.load({key})
    }catch(_) {
    }
}



export const getAccount = async (): Promise<AccountObj[]> => {


    const res = await storage.getAllDataForKey(ACCOUNT_DB)

    return res as AccountObj[]
}

export const updateSingleAccount = async (account: AccountObj) => {
    storage.save({
        key: ACCOUNT_DB,
        id: account.id + '',
        data: account
    })

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
    storage.remove({
        key: ACCOUNT_DB,
        id: id + '',
    });
}

export const getTx = async (address: string, net: string = DEFAULT_NET): Promise<TransactionInterface[]> => {

    const res = await storage.getAllDataForKey(TRANSACTION_DB)
    return res.filter(item => {
        return (item.from === address && item.net === net)
            || (item.to === address && item.status === TRANSACTION_STATUS_SUCCESS && item.net === net)
            || (item.address === address.toLocaleLowerCase() && item.net === net)
            || (item.to === address.toLocaleLowerCase() && item.status === TRANSACTION_STATUS_SUCCESS && item.net === net)
    })
}


export const getContractTx = async (
    address: string,
    contractAddress: string,
    net: string = DEFAULT_NET
): Promise<TransactionInterface[]> => {

    const res = await storage.getAllDataForKey(TRANSACTION_DB)
    return res.filter(item => {
        return (item.from === address && item.to === contractAddress && item.net === net)
    })

}


export const insertTx = async (tx: TransactionInterface, net: string = DEFAULT_NET) => {
    const insertData = { ...tx, net }
    await storage.save({
        key:TRANSACTION_DB,
        id:tx.transactionHash+net,
        data:insertData

    })
}

export const updateTx = async(txHash: string, updateObj: any, net: string = DEFAULT_NET) => {
    await storage.save({
        key:TRANSACTION_DB,
        id:txHash+net,
        data:updateObj
    })
}

// /**
//  * insert wallet
//  */

export const insertWallet = async (walletObj: WalletObj) => {
    await storage.save({
        key:WALLET_DB,
        id:walletObj.walletId+'',
        data:walletObj
    })
}

// /**
//  * get walelt by walelt id
//  */

export const getWallet = async (walletId?: number): Promise<WalletObj | undefined> => {

    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    return res 
}

// /**
//  * get active account id
//  */

export const getActiveId = async (walletId: number): Promise<string> => {
    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    return res ? res.activeAccountId as string : '1'
}

export const getErrTimes = async (walletId: number): Promise<number> => {
    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    return res ? res.unlockErrTimes : 0
}

export const getLockTime = async (walletId: number): Promise<string> => {
    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    return res ? res.lockTime : ''
}

export const updateLockTime = async (walletId: number, lockTime: string) => {
    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    if(res){
        await storage.save({
            key:WALLET_DB,
            id:walletId+'',
            data:{
                ...res,
                lockTime
            }
        })
    }

}

export const updateActiveId = async (walletId: number, activeAccountId: string) => {

    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    if(res){
        await storage.save({
            key:WALLET_DB,
            id:walletId+'',
            data:{
                ...res,
                activeAccountId
            }
        })
    }

}

export const updateErrTimes = async (walletId: number, unlockErrTimes: number = 0) => {

    const res = await storage.load({
        key:WALLET_DB,
        id:walletId+''
    })
    if(res){
        await storage.save({
            key:WALLET_DB,
            id:walletId+'',
            data:{
                ...res,
                unlockErrTimes
            }
        })
    }
}


export const resetDB = () => {
    storage.clearMapForKey(ACCOUNT_DB)
    storage.clearMapForKey(TRANSACTION_DB)
    storage.clearMapForKey(WALLET_DB)
}