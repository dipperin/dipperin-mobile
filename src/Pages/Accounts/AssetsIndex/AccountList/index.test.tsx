import React from 'react'
import { mockI18n } from 'tests/mocks/i18n'
import { shallow, ShallowWrapper } from 'enzyme'
import  Account   from 'Models/account'
import AccountItem from './account'
import  AccountList  from './index'

describe('AccountList', () => {
    let props = {
        accounts: [new Account('1', 'path', 'address', '')],
        isEyeOpen: false,
        changeActiveAccount: jest.fn(),
        labels: mockI18n.dipperin.account,
    }
    let component: ShallowWrapper
    beforeEach(() => {
        component = shallow(<AccountList {...props} />)
    })
    it('render', () => {
        expect(component.find(AccountItem).length).toBe(1)
    })
})
