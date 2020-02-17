import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { CreateStep3 } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import { resource } from 'I18n/config'
import mockRootBuilder from 'tests/mocks/root'
const { wallet } = mockRootBuilder()

describe('CreateStep3', () => {
    const props = {
        wallet,
        navigation: mockNavigation,
        labels: resource.en.dipperin.createStep3   
    }

    let component: ShallowWrapper<React.FunctionComponent>
   
    it('render', async () => {
        await wallet.create('123456578')
        component = shallow(<CreateStep3 {...props}/>).dive()
        expect(component.find('View').length).toBeGreaterThan(0)
    })

})