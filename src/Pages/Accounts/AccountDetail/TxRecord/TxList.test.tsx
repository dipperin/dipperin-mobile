import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import TransactionModel from 'Models/transaction'
import { mockI18n } from 'tests/mocks/i18n'
import { FlatList } from 'react-native'

import { TxList, Props } from './TxList'
import * as api  from 'Server'
const txFromNode={
    hash: '0x11',
    block_hash: '0x22',
    block_number: 22,
    tx_type:1,
    to_address: '0x44',
    from_address: '0x44',
    nonce: 11,
    gasPrice: '100',
    cost: '100',
    amount: '42222',
    stake: '200',
    vrf_hash: '0x33',
    priority: 100,
    extra_data: 'yu',
    created_at: '2018/09/09',
    size: 50,
    timestamp: '23122423434444',
    position: 500,
}
// api.getTxList = jest.fn().mockReturnValueOnce({
//     success:true,
//     tx_list: []
//     total_count: 1
// })

describe('TxList', () => {
    const mockTx = {
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
    let props: Props = {
        activeAccountaddress: '0xaaa',
        transactionsFromLocal: [new TransactionModel(mockTx)],
        labels: mockI18n.dipperin.account,
        keyIndex: 'all',
    }

    let component: ShallowWrapper
    let instance: TxList
    beforeEach(() => {
        component = shallow(<TxList {...props} />)
        instance = component.instance() as TxList
    })
    it('render', () => {
        expect(component.find(FlatList).length).toBe(1)
    })
    it('componentDidMount', () => {
        instance.componentDidMount()
        expect(instance.refresh).toBeCalled()
    })
    it('getFromOrTo', () => {
        const res = instance.getFromOrTo()
        expect(res).toBe('')

    })
    it('getFromOrTo sent', () => {
        component.setProps({ keyIndex: 'sent' })
        const res = instance.getFromOrTo()
        expect(res).toBe('from')
    })
    it('getFromOrTo received', () => {
        component.setProps({ keyIndex: 'received' })
        const res = instance.getFromOrTo()
        expect(res).toBe('to')
    })
    it('getMoreTransaction',()=>{
        instance.getMoreTransaction()
        expect(instance.getTransctionsfromNode).toBeCalled()
    })
    it('refresh',()=>{
        instance.refresh()
        expect(instance.getTransctionsfromNode).toBeCalled()
    })
})
