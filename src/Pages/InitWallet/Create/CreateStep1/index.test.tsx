import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { CreateStep1 } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import { resource } from 'I18n/config'

describe('CreateStep1', () => {
    const props = {
        navigation: mockNavigation,
        labels: resource.en.dipperin.createStep1   
    }

    let component: ShallowWrapper<React.FunctionComponent>
    beforeEach(() => {
        component = shallow(<CreateStep1 {...props}/>)
    })

    it('render', () => {
        expect(component.find('View').length).toBeGreaterThan(0)
    })

})