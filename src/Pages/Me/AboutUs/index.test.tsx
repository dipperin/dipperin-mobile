import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'

import {AboutUs} from './index'
import { mockNavigation } from 'tests/mocks/navigation'

describe('AboutUs page', () => {
    let component: ShallowWrapper
    let instance: AboutUs
    beforeEach(() => {
        component = shallow(<AboutUs navigation={mockNavigation} />)
        instance = component.instance() as AboutUs
    })
    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(4)
    })

    it('gotoUserProtocol function', () => {
        mockNavigation.navigate = jest.fn()
        instance.gotoUserProtocol()
        expect(mockNavigation.navigate).toBeCalledWith('userProtocol')
    })
})

