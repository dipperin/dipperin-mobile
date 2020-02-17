import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import TransactionModel from 'Models/transaction'
import { mockI18n } from 'tests/mocks/i18n'
import { FlatList } from 'react-native'
jest.mock('Components/PopupWindow')
import { TxList, Props } from './TxList'

// const txFromNode={
//     hash: '0x11',
//     block_hash: '0x22',
//     block_number: 22,
//     tx_type:1,
//     to_address: '0x44',
//     from_address: '0x44',
//     nonce: 11,
//     gasPrice: '100',
//     cost: '100',
//     amount: '42222',
//     stake: '200',
//     vrf_hash: '0x33',
//     priority: 100,
//     extra_data: 'yu',
//     created_at: '2018/09/09',
//     size: 50,
//     timestamp: '23122423434444',
//     position: 500,
// }


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
        const refresh = jest.spyOn(instance,'refresh')
        instance.componentDidMount()
        expect(refresh).toBeCalled()
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
        const getTransctionsfromNode = jest.spyOn(instance,'getTransctionsfromNode')
        instance.getMoreTransaction()
        expect(getTransctionsfromNode).toBeCalled()
    })
    it('refresh',()=>{
        const getTransctionsfromNode = jest.spyOn(instance,'getTransctionsfromNode')
        instance.refresh()
        expect(getTransctionsfromNode).toBeCalled()
    })
    it('getTransctionsfromNode',async()=>{
        await instance.getTransctionsfromNode({
            address:'0x112233',
            page:1,
            per_page:10,
        })
        expect(instance.currentPage).toBe(3)
        expect(instance.transactionsFromNode.length).toBe(2)
    })
})
