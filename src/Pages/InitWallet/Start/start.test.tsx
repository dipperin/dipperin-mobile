import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Start } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import { resource } from 'I18n/config'

describe('Start', () => {
    const props = {
        navigation: mockNavigation,
        labels: resource.en.dipperin.start   
    }

    let component: ShallowWrapper<Start>, instance: Start
    beforeEach(() => {
        component = shallow(<Start {...props}/>)
        instance = component.instance() as Start
    })

    it('render', () => {
        expect(component.find('View').length).toBeGreaterThan(0)
        mockNavigation.navigate.mockClear()
    })

    it('handleCreate', () => {
        instance.handleCreate()
        expect(mockNavigation.navigate).toBeCalledWith('create')
    })

    it('handleImport', () => {
        instance.handleImport()
        expect(mockNavigation.navigate).toBeCalledWith('import')
    })
})