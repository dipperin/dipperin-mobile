import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { NodeChoose } from './index'
import mockRootBuilder from 'tests/mocks/root'
import { NET } from 'Global/constants'

describe('NodeChoose page unit test', () => {
    let component: ShallowWrapper
    let instance: NodeChoose
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const chainData = mockRoot.chainData
    beforeEach(() => {
        component = shallow(<NodeChoose chainData={chainData}/>).dive()
        instance = component.instance() as NodeChoose
    })

    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })

    it('handleChange function', () => {
        chainData.changeNet = jest.fn()
        instance.handleChange(NET.VENUS)()
        expect(chainData.changeNet).toBeCalledWith(NET.VENUS)
    })
})
