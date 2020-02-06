import React from 'react'
import { View } from 'react-native'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockNavigation } from 'tests/mocks/navigation'
import { mockI18n } from 'tests/mocks/i18n'
import { TransactionDetail } from './index'
import Transaction from 'Models/transaction'
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
    timestamp: 1580867867481,
}


describe('TransactionDetail', () => {
    mockNavigation.getParam = jest.fn().mockReturnValue(new Transaction(mockTx) )
    let props = {
        labels: mockI18n.dipperin.account,
        navigation: mockNavigation,
    }
    let component: ShallowWrapper
    beforeEach(() => {
        component = shallow(<TransactionDetail {...props} />)
    })
    it('render', () => {
        expect(component.find(View).length).toBe(9)
    })
})

