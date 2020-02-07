import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Icon } from 'Components/Icon'
import Eye from './index'

describe('eye', () => {
    let props = {
        isEyeOpen: false,
        onPress: jest.fn(),
    }
    let component: ShallowWrapper
    let instance:Eye
    beforeEach(() => {
        component = shallow(<Eye {...props} />)
        instance = component.instance() as Eye
    })
    it('render', () => {
        expect(component.find(Icon).length).toBe(1)
    })
    it('handlePress',()=>{
        instance.handlePress()
        expect(props.onPress).toBeCalledWith(true)
    })

})
