import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { ScanScreen } from './index'
import { RNCamera } from 'react-native-camera'
import { mockNavigation } from 'tests/mocks/navigation'
import { mockI18n } from 'tests/mocks/i18n'

jest.mock('Components/PopupWindow')

describe('ScanScreen', () => {
    let component: ShallowWrapper
    let instance: ScanScreen
    beforeEach(() => {
        component = shallow(
            <ScanScreen
                navigation={mockNavigation}
                labels={mockI18n.dipperin.account}
            />,
        )
        instance = component.instance() as ScanScreen
    })
    it('render',()=>{
        expect(component.find(RNCamera).length).toBe(1)
    })
    it('componentDidMount',()=>{
        const startAnimation = jest.spyOn(instance,'startAnimation')
        instance.componentDidMount()
        expect(startAnimation).toBeCalled()
    })
    it('startAnimation',()=>{
        instance.startAnimation()
    })
    it('onBarCodeRead success',()=>{
        const res = {
            data:0x0000739137Fef8E1a03f8B987138F141f740223577f6,
        }
        instance.onBarCodeRead(res)
    })

    it('onBarCodeRead fail',()=>{
        const res = {
            data:'8B987138F141f740223577f6',
        }
        const res1 = instance.onBarCodeRead(res)
        expect(res1).toBe(undefined)
    })
    it('getCarema',()=>{
        instance.getCarema('carema')
        expect(instance.camera).toBe('carema')
    })
})
