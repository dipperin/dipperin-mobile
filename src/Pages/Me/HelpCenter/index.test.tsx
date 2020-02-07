import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { HelpCenter } from './index'
import { mockI18n } from 'tests/mocks/i18n'
import { mockNavigation } from 'tests/mocks/navigation'
import { Text } from 'react-native'

const mockLabels = mockI18n.dipperin.me

const mockItems = {
    id: '1',
    title: mockLabels.FAQForgetPassowrdTitle,
    detail: (
        <>
            <Text>test</Text>
        </>
    ),
}

describe('HelpCenter page', () => {
    let component: ShallowWrapper
    let instance: HelpCenter

    beforeEach(() => {
        try {
            component = shallow(
                <HelpCenter
                    label={mockLabels}
                    navigation={mockNavigation}
                />
            )
            instance = component.instance() as HelpCenter
        } catch (error) {
            console.log(error)
        }
    })

    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })

    it('renderItems function', () => {
        let res = instance.renderItems()
        expect(res.length).toBe(6)
    })

    it('goDetail Function', () => {
        mockNavigation.navigate = jest.fn()
        instance.goDetail(mockItems)
        expect(mockNavigation.navigate).toBeCalledWith('helpCenterDetail', {id: '1'})
    })
})

