import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { AccountDetail } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import mockRootBuilder from 'tests/mocks/root'
import { mockI18n } from 'tests/mocks/i18n'
import TxRecord from './TxRecord'
import AccountInfo from './AccountInfo'

describe('AccountDetail', () => {
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const transaction = mockRoot.transaction
    const account = mockRoot.account
    const system = mockRoot.system
    let component: ShallowWrapper
    let instance: AccountDetail
    let props = {
        transaction,
        account,
        system,
        navigation: mockNavigation,
        labels: mockI18n.dipperin.account,
    }


    beforeEach(() => {
        component = shallow(<AccountDetail  {...props} />).dive()
        instance = component.instance() as AccountDetail
    })
    it('render',()=>{
        expect(component.find(AccountInfo).length).toBe(1)
        expect(component.find(TxRecord).length).toBe(1)
    })
    it('navigate',()=>{
        instance.navigate('send')()
        expect(props.navigation.navigate).toBeCalledWith('send')
    })
    it('didFocus',()=>{
        const { activeAccount } = props.account
        const title = activeAccount?.name ? activeAccount?.name : `${props.labels.accountName} ${activeAccount?.id}`
        instance.didFocus()
        expect(mockNavigation.setParams).toBeCalledWith({title})
    })






})


