import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { View } from 'react-native'
import { mockI18n } from 'tests/mocks/i18n'
import { mockNavigation } from 'tests/mocks/navigation'
import TransactionModel from 'Models/transaction'
import moment from 'moment'

import Collection from 'Assets/collection.png'
import Transfer from 'Assets/transfer.png'

import { TxItem ,Props } from './TxItem'

describe('TxItem', () => {
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
    let props :Props = {
        activeAccountaddress: '0xaaa',
        transaction: new TransactionModel(mockTx),
        navigation: mockNavigation,
        labels: mockI18n.dipperin.account,
        keyIndex: 'all',
    }
    let component: ShallowWrapper
    let instance: TxItem
    beforeEach(() => {
        component = shallow(<TxItem {...props} />)
        instance = component.instance() as TxItem
    })

    it('render',()=>{
        expect(component.find(View).length).toBe(4)
    })
    it('goDetail',()=>{
        instance.goDetail()
        expect(props.navigation.navigate).toBeCalled()
    })
    it('getShowTime',()=>{
        let time1 = instance.getShowTime(44444444111111112)
        expect(time1).toBe(moment(44444444111111112 / 1000000).format('YYYY/MM/DD'))
        let time2 = instance.getShowTime(4444444444444)
        expect(time2).toBe(moment(4444444444444).format('YYYY/MM/DD'))
    })
    it('getIconAndText',()=>{
        let res1 = instance.getIconAndText(true)
        expect(res1).toEqual({
            text:props.labels.to,
            icon:Transfer,
        })
        let res2 = instance.getIconAndText(false)
        expect(res2).toEqual({
            text:props.labels.from,
            icon:Collection,
        })
    })
    it('getIconAndText failed',()=>{
        component.setProps({
            keyIndex:'failed',
        })
        let res1 = instance.getIconAndText(true)
        expect(res1).toEqual({
            text:props.labels.to,
            icon:Transfer,
        })

        let res2 = instance.getIconAndText(false)
        expect(res2).toEqual({
            text:props.labels.from,
            icon:Collection,
        })
    })

    it('getIconAndText sent',()=>{
        component.setProps({
            keyIndex:'sent',
        })
        let res1 = instance.getIconAndText(true)
        expect(res1).toEqual({
            text:props.labels.to,
            icon:Transfer,
        })
    })
    it('getIconAndText received',()=>{
        component.setProps({
            keyIndex:'received',
        })
        let res1 = instance.getIconAndText(true)
        expect(res1).toEqual({
            text:props.labels.from,
            icon:Collection,
        })
    })
})
