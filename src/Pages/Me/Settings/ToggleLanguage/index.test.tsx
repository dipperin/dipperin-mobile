import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ToggleLanguage } from './index'
import mockRootBuilder from 'tests/mocks/root'

describe('ToggleLanguage page unit test', () => {
    let componet: ShallowWrapper
    let instance: ToggleLanguage

    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const system = mockRoot.system
    const props = {
        system,
    }
    beforeEach(() => {
        componet = shallow(<ToggleLanguage {...props}/>).dive()
        instance = componet.instance() as ToggleLanguage
    })

    it('render function', () => {
        expect(componet.find('View').length).toBeGreaterThanOrEqual(1)
    })

    it('handleChange function', () => {
        system.setCurLanguage = jest.fn()
        instance.handleChange('test')()
        expect(system.setCurLanguage).toBeCalledWith('test')
    })
})

