import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'

import {Discovery} from './index'
import { mockNavigation } from 'tests/mocks/navigation'

describe('Discovery page', () => {
    let component: ShallowWrapper
    let instance: any
    beforeEach(() => {
        component = shallow(<Discovery navigation={mockNavigation} />)
        instance = component.instance() as any
    })
    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })

    it('componentDidMount', () => {
        expect(instance.componentDidMount()).toBeUndefined()
    })

    it('componentWillUnmount', () => {
        instance.componentWillUnmount()
        expect(instance._navListener).toBeUndefined()
    })

    it('tabsChange function', () => {
        const _index = 1
        instance.tabsChange(_index)
        expect(instance.state.activeIndex).toBe(1)
    })
})

