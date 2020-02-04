import React from 'react'
import { shallow,ShallowWrapper} from 'enzyme'
import {AddAccount } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import mockRootBuilder from 'tests/mocks/root'
import { mockI18n } from 'tests/mocks/i18n'
import { InputItem } from '@ant-design/react-native';

describe('AddAccount',()=>{
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const account = mockRoot.account
    let component: ShallowWrapper
    let instance: AddAccount
    let props = {
        account,
        navigation:mockNavigation,
        labels:mockI18n.dipperin.account,
    }
    beforeAll(async()=>{
        await mockRoot.initWallet()
    })
    beforeEach(()=>{
        component = shallow(<AddAccount {...props}/>).dive()
        instance = component.instance() as AddAccount
    })
    it('render',()=>{
        expect(component.find(InputItem).length).toBe(1)
    })
    it('componentDidMount',()=>{
        instance.componentDidMount()
        expect(props.navigation.setParams).toBeCalled()
    })
    it('addAcount',async()=>{
        await instance.addAcount()
        expect(mockNavigation.goBack).toBeCalled()
    })
})
