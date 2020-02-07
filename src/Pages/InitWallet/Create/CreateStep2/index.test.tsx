import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { CreateStep2 } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import { resource } from 'I18n/config'
import mockRootBuilder from 'tests/mocks/root'

describe('CreateStep2', () => {
    const { wallet } = mockRootBuilder()
    const props = {
        wallet,
        navigation: mockNavigation,
        labels: resource.en.dipperin.createStep2   
    }

    let component: ShallowWrapper<React.FunctionComponent>
    beforeEach(() => {
        component = shallow(<CreateStep2 {...props}/>).dive()
    })

    it('render', () => {
        expect(component.find('View').length).toBeGreaterThan(0)
    })

})