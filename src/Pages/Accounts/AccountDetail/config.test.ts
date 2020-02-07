import {
    getFailedTransactions,
    getPendingAndFailedTransactions,
    transferTxfromNode,
} from './config'

import TransactionModel from 'Models/transaction'

describe('config func',()=>{
    const mockTx1 = {
        nonce: '1',
        value: '1',
        from: '0xaaa',
        to: '0x11111',
        extraData: 'aaaa',
        timeLock: 1,
        status: 'fail',
        hashLock: '',
        transactionHash: '0x111112',
        fee: '1',
        timestamp: 111,
    }
    const mockTx2 = {
        nonce: '1',
        value: '1',
        from: '0xaaa',
        to: '0x11111',
        extraData: 'aaaa',
        timeLock: 1,
        status: 'pending',
        hashLock: '',
        transactionHash: '0x111112',
        fee: '1',
        timestamp: 111,
    }
    const failedtx = new TransactionModel(mockTx1)
    const pendingtx = new TransactionModel(mockTx2)

    it('getFailedTransactions',()=>{
        const res = getFailedTransactions([failedtx])
        expect(res).toEqual([failedtx])
    })
    it('getPendingAndFailedTransactions',()=>{
        const res = getPendingAndFailedTransactions([failedtx,pendingtx])
        expect(res).toEqual([failedtx,pendingtx])
    })
})
