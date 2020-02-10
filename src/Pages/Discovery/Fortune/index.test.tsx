import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import mockRootBuilder from 'tests/mocks/root'
import {Fortune} from './index'

describe('Fortune page', () => {
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
        component = shallow(<Fortune {...props} />).dive()
        instance = component.instance() as any
    })
    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })
    
   it('componentDidMount function', () => {
       instance.getFortuneList = jest.fn()
       instance.componentDidMount()
       expect(instance.getFortuneList).toBeCalled()
   })
    
   it('getFortuneList', async () => {
       const page = 1, per_page = 10;
       const getFortuneList = jest.spyOn(discovery, 'getFortuneList')
       instance.getFortuneList(page, per_page)
       expect(getFortuneList).toBeCalled()
   })

   it('onEndReached function', () => {
        instance.onEndReached()
        expect(instance.onEndReached()).toBeUndefined()
    })
    it('renderItem function', () => {
        const item = {
            sort: 1,
            address: 'string',
            name: 'string',
            dip_balance: 12,
            balance: 10
          },
          index = 1,
          totalBlocks = 120;
        expect(instance.renderItem(item,index, totalBlocks )).not.toBeNull()
    })
})

