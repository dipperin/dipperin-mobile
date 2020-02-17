import React from 'react'
import {Icon} from './index'
import {shallow} from 'enzyme'

describe('Icon component', () => {
    it('Icon component', () => {
        let component = shallow(<Icon name={'icon|test'} color={'#fff'} size={20}/>).dive()
        expect(component.exists()).toBeTruthy()
    })

    it('Icon component 2', () => {
        let component = shallow(<Icon name={'icon|openEye'} color={'#fff'} size={20}/>).dive()
        expect(component.exists()).toBeTruthy()
    })
})

