import React from 'react'
import { View } from 'react-native'
import { mockI18n } from 'tests/mocks/i18n'
import { shallow, ShallowWrapper } from 'enzyme'
import { AssetsInfo } from './index'

describe('AssetsInfo', () => {
    let props = {
        isEyeOpen: false,
        setIsEyeOpen: jest.fn(),
        assets: 80000,
        labels: mockI18n.dipperin.account,
    }
    let component: ShallowWrapper
    beforeEach(() => {
        component = shallow(<AssetsInfo {...props} />)
    })
    it('render', () => {
        expect(component.find(View).length).toBe(1)
    })
})
