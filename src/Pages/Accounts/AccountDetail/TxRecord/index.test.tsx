import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockI18n } from 'tests/mocks/i18n'
import mockRootBuilder from 'tests/mocks/root'
import { TxRecord, Props } from './index'
import TxList from './TxList'


describe('TxRecord', () => {
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    let props: Props = {
        transaction: mockRoot.transaction,
        activeAccount: mockRoot.account.activeAccount,
        labels: mockI18n.dipperin.account,
    }
    let component: ShallowWrapper

    beforeEach(() => {
        component = shallow(<TxRecord {...props} />)

    })
    it('render', () => {
        expect(component.find(TxList).length).toBe(4)
    })

})
