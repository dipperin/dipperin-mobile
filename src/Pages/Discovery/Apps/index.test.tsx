import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import mockRootBuilder from 'tests/mocks/root'
import { Apps } from './index'

describe('Apps page', () => {
    let component: ShallowWrapper
    let instance: any
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const discovery = mockRoot.discovery
    const transaction = mockRoot.transaction
    let props = {
        discovery,
        transaction
    }
    beforeEach(() => {
        component = shallow(<Apps {...props} />).dive()
        instance = component.instance() as any
    })
    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })
    
   it('componentDidMount function', () => {
       instance.getAppsList = jest.fn()
       instance.componentDidMount()
       expect(instance.getAppsList).toBeCalled()
   })
    
   it('getAppsList', async () => {
       const params = {
          page: 1, 
          per_page: 10,
          as_and_desc: 'asc',
          order_by: 'balance'
       }
       let getAppsList = jest.spyOn(discovery, 'getAppsList')
       await instance.getAppsList({...params})
       expect(getAppsList).toBeCalled()
   })

    it('onEndReached function', () => {
        instance.onEndReached()
        expect(instance.onEndReached()).toBeUndefined()
    })
    it('renderItem function', () => {
        const item = {
            name: 'test',
            balance: 'test',
            user_count: 1,
            tx_count: 1,
            tx_amount: 'string',
            image_url: 'string',
            classification: 'string'
          }
          const appResource = [{
            name: 'test',
            image_url: 'string',
            classification: 'string'
          }]
        expect(instance.renderItem(item,appResource )).not.toBeNull()
    })
})

