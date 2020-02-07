import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { ResetWalletPop } from './ResetWalletPop'

import { mockI18n } from 'tests/mocks/i18n'

describe('ResetWalletPop page', () => {
    let component: ShallowWrapper
    const props = {
        language: mockI18n.dipperin.me,
        visible: false,
        onCancel: jest.fn(),
    }
    beforeEach(() => {
        component = shallow(<ResetWalletPop {...props}/>).dive()
    })

    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(3)
    })
})


