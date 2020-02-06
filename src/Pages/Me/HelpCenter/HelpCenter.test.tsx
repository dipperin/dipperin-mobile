import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { HelpCenter } from './index'
import { mockI18n } from 'tests/mocks/i18n'
import { mockNavigation } from 'tests/mocks/navigation'

describe('HelpCenter page', () => {
    const mockLabels = mockI18n.dipperin.me
    let component: ShallowWrapper
    let instance: HelpCenter

    beforeEach(() => {
        component = shallow(
            <HelpCenter
                label={mockLabels}
                navigation={mockNavigation}
            />
        )
        instance = component.instance() as HelpCenter
    })

    it('render function', () => {

    })
})

