import React from 'react'
import { shallow,ShallowWrapper} from 'enzyme'
import { mockNavigation } from 'tests/mocks/navigation'
import { mockI18n } from 'tests/mocks/i18n'
import mockRootBuilder from 'tests/mocks/root'
import AssetsInfo from './AssetsInfo'


import { Assets } from './index'

describe('assets',()=>{
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const account = mockRoot.account
    const system = mockRoot.system
    let component: ShallowWrapper
    let instance: Assets
    let props = {
        account,
        system,
        navigation: mockNavigation,
        labels: mockI18n.dipperin.account,
    }
    beforeEach(() => {
        component = shallow(<Assets  {...props} />).dive()
        instance = component.instance() as Assets
    })
    it('render',()=>{
        expect(component.find(AssetsInfo).length).toBe(1)
    })
    it('didFocus',()=>{
        instance.didFocus()
        expect(props.navigation.setParams).toBeCalled()
    })
    it('didBlur',()=>{
        instance.didBlur()
    })
    it('getAllAssets',async()=>{
        await account.load()
        console.log('accounts',account.accounts.length)
        expect(instance.getAllAssets()).toBe(0)
    })

})
