import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import mockRootBuilder from 'tests/mocks/root'
import {Contracts} from './index'

describe('Contracts page', () => {
    let component: ShallowWrapper
    let instance: any
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const discovery = mockRoot.discovery
    const transaction = mockRoot.transaction
    const props = {
        discovery,
        transaction
    }
    beforeEach(() => {
        component = shallow(<Contracts {...props} />).dive()
        instance = component.instance() as any
    })
    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })
    
   it('componentDidMount function', () => {
       instance.init = jest.fn()
       instance.componentDidMount()
       expect(instance.init).toBeCalled()
   })
    
   it('function init', async () => {
       const params = {
          page: 1, 
          per_page: 10,
          as_and_desc: 'asc',
          order_by: 'balance'
       }
       const getContractList = jest.spyOn(discovery, 'getContractList')
       await instance.init({...params})
       expect(getContractList).toBeCalled()
   })

   it('onEndReached function', () => {
        instance.onEndReached()
        expect(instance.onEndReached()).toBeUndefined()
    })
    it('renderItem function', () => {
        const item = {
            address: 'string',
            contract_name: 'string',
            dip_balance: 'string',
            tx_count: 12,
            token_money_total: 'string'
          }
        expect(instance.renderItem(item)).not.toBeNull()
    })
})

