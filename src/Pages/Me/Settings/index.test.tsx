import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
// import { mockI18n } from 'tests/mocks/i18n'
import { Settings } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import mockRootBuilder from 'tests/mocks/root'
import { FINGER_UNLOCK, LANGEUAGE } from './config'

jest.mock('Components/PopupWindow')

const mockItems: any = [
    {
        title: 'test',
        extra: 'English',
        arrow: 'horizontal',
    },
    {
        title: 'test',
        extra: 'English',
        arrow: 'horizontal',
    },
]

describe('Personal Center page unit test', () => {
    let component: ShallowWrapper
    let instance: Settings
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const chainData = mockRoot.chainData
    const system = mockRoot.system
    const props = {
        navigation: mockNavigation,
        system,
        chainData,
    }
    beforeEach(() => {
        component = shallow(<Settings {...props} />).dive()
        instance = component.instance() as Settings
    })

    it('render test', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(1)
    })

    it('renderItem fucntion', () => {
        const res = instance.renderItem(mockItems)
        expect(res.length).toBe(2)
    })

    it('handleListMainChange function unit test, and key is "fingerUnLock"', () => {
        system.setFingerUnLock = jest.fn()
        system.setFingerPay = jest.fn()
        instance.handleListMainChange(FINGER_UNLOCK, false)
        expect(system.setFingerUnLock).toBeCalledWith(false)
        expect(system.setFingerPay).not.toBeCalled()
    })

    it('handleListMainChange function unit test, and key is not "fingerUnLock"', () => {
        system.setFingerUnLock = jest.fn()
        system.setFingerPay = jest.fn()
        instance.handleListMainChange('test', false)
        expect(system.setFingerPay).toBeCalledWith(false)
        expect(system.setFingerUnLock).not.toBeCalled()
    })

    it('goToChangePassword function', () => {
        instance.goToChangePassword('')
        expect(mockNavigation.navigate).toBeCalledWith('changePassword')
    })

    it('handleExtPassword function unit Test, and params is "LANGEUAGE"', () => {
        instance.handleExtRoute(LANGEUAGE)
        expect(mockNavigation.navigate).toBeCalledWith('toggleLanguage')
    })

    it('handleExtPassword function unit Test, and params is not "LANGEUAGE"', () => {
        instance.handleExtRoute('')
        expect(mockNavigation.navigate).toBeCalledWith('nodeChoose')
    })
})

