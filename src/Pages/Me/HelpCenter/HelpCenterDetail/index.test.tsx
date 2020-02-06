import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { HelpCenterDetail } from './index'
import { mockI18n } from 'tests/mocks/i18n'
import { mockNavigation } from 'tests/mocks/navigation'


describe('HelpCenterDetail page', () => {
    let componet: ShallowWrapper
    let instance: HelpCenterDetail
    let props = {
        label: mockI18n.dipperin.me,
        navigation: mockNavigation,
    }
    beforeEach(() => {
        componet = shallow(<HelpCenterDetail {...props}/>)
        instance = componet.instance() as HelpCenterDetail
    })
    it('getUrlParams function', async () => {
        props.navigation.getParam = jest.fn().mockResolvedValueOnce('test')
        await instance.getUrlParams()
        expect(instance.curId).toBe('test')
    })

    it('render', () => {
        expect(componet.find('View').length).toBeGreaterThanOrEqual(1)
    })

    
})



