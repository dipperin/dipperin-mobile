import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockI18n } from 'tests/mocks/i18n'
import mockRootBuilder from 'tests/mocks/root'
import { TxRecord, Props } from './index'
import Account from 'Models/account'
import TxList from './TxList'


describe('TxRecord', () => {
    const mockRoot = mockRootBuilder(false)
    let props: Props = {
        transaction: mockRoot.transaction,
        activeAccount: new Account('1', 'path', 'address', ''),
        labels: mockI18n.dipperin.account,
    }
    let component: ShallowWrapper
    beforeAll(async()=>{
        await mockRoot.initWallet()
    })

    beforeEach(() => {
        component = shallow(<TxRecord {...props} />)

    })
    it('render', () => {
        expect(component.find(TxList).length).toBe(4)
    })

})
