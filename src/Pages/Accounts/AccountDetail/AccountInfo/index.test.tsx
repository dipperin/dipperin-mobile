import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockI18n } from 'tests/mocks/i18n'
import AccountModel from 'Models/account'
import { AccountInfo, Props } from './index'
import Eye from 'Components/Eye'

describe('AccountInfo', () => {

    let props: Props
    let component: ShallowWrapper
    beforeEach(() => {
        props = {
            labels: mockI18n.dipperin.account,
            account: new AccountModel(
                'sqEVSm4jZaNAegxA',
                "m/44'/709394'/0'/0/1",
                '0x0000b4293d60F051936beDecfaE1B85d5A46d377aF37',
                ''),
            isEyeOpen: true,
            setIsEyeOpen: jest.fn(),
        }
        component = shallow(<AccountInfo {...props} />).dive()

    })
    it('render', () => {
        expect(component.find(Eye).length).toBe(1)
    })

})
