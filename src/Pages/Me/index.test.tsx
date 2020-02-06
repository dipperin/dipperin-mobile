import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockI18n } from 'tests/mocks/i18n'
import { Me } from './index'
import { mockNavigation } from 'tests/mocks/navigation'

jest.mock('Components/PopupWindow')
let mockMeItem = {
    iconName: 'icon|shezhi1',
    iconColor: '#1C77BC',
    title: 'test',
    routeName: '',
}

describe('Personal Center page unit test', () => {
    const mockLabels = mockI18n.dipperin.me
    let component: ShallowWrapper
    let instance: Me
    beforeEach(() => {
        component = shallow(
            <Me
                navigation={mockNavigation}
                labels={mockLabels}
            />
        )
        instance = component.instance() as Me
    })

    it('componentDidMount function unit test', () => {
        instance.componentDidMount()
        expect(instance._navListener).not.toBeNull()
    })

    it('componentWillUnmount function unit test', () => {
        instance.componentWillUnmount()
        expect(instance._navListener).toBeNull()
    })
    it('render test', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })

    it('renderItems function', () => {
        const res = instance.renderItems()
        expect(res.length).toBeGreaterThanOrEqual(3)
    })

    it('clickItem function 1', () => {
        mockNavigation.navigate = jest.fn()
        instance.clickItem(mockMeItem)()
        expect(mockNavigation.navigate).not.toBeCalled()
    })
    it('clickItem function 2', () => {
        mockNavigation.navigate = jest.fn()
        mockMeItem.routeName = 'setting'
        instance.clickItem(mockMeItem)()
        expect(mockNavigation.navigate).toBeCalled()
    })
})
