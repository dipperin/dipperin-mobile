import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockI18n } from 'tests/mocks/i18n'
import AccountModel from 'Models/account'
import { AccountItem, Props } from './account'
import { mockNavigation } from 'tests/mocks/navigation'

describe('AccountInfo', () => {

    let props: Props
    let component: ShallowWrapper
    let instance: AccountItem
    beforeEach(() => {
        props = {
            labels: mockI18n.dipperin.account,
            account: new AccountModel(
                'sqEVSm4jZaNAegxA',
                "m/44'/709394'/0'/0/1",
                '0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37',
                ''),
            isEyeOpen: true,
            changeActiveAccount: jest.fn(),
            navigation: mockNavigation,

        }
        component = shallow(<AccountItem {...props} />)
        instance = component.instance() as AccountItem
    })
    it('render', () => {
        expect(component.find('View').length).toBe(2)
    })
    it('goDetail', () => {
        instance.goDetail()
        expect(mockNavigation.navigate).toBeCalled()
    })
})
