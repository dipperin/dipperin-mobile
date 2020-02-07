import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Splash from './index'
import mockRootBuilder from 'tests/mocks/root'
import { mockNavigation } from 'tests/mocks/navigation'
jest.mock('react-native-splash-screen', () => ({}))
import SplashScreen from 'react-native-splash-screen'

describe('Splash', () => {
    const { wallet, system } = mockRootBuilder(true)
    const props = {
        wallet,
        system,
        navigation: mockNavigation
    }
    const mockHide = SplashScreen.hide = jest.fn()
    system.loading = false
    let component: ShallowWrapper<Splash>, instance: Splash
    beforeEach(() => {
        component = shallow(<Splash {...props}/>).dive()
        instance = component.instance() as Splash
        mockHide.mockClear()
        mockNavigation.navigate.mockClear()
    })

    it('render', () => {
        expect(component.find('View').length).toBeGreaterThan(0)
    })

    it('handleLinkUrlChange', async () => {
        const url = 'dp://send?address=111&amount=1'
        await wallet.create('12345678', 'unusual drastic patrol mansion fuel more obey acquire disagree head trip chat')
        instance.handleLinkUrlChange({url})
        expect(mockHide).toBeCalled()
        expect(mockNavigation.navigate.mock.calls[0]).toEqual([
            'lock',
            {
                address: '111',
                amount: '1',
                scheme: '',
                type: 'send'
            }
        ])
    })

    it('checkLoading loading', () => {
        instance.checkLoading(true)
        expect(mockNavigation.navigate).not.toBeCalled()
    })

    it('checkLoading normal', () => {
        instance.checkLoading(false)
        expect(mockNavigation.navigate).toBeCalledWith('lock')
    })

    it('checkLoading no wallet', () => {
        wallet.clear()
        instance.checkLoading(false)
        expect(mockNavigation.navigate).toBeCalledWith('start')
    })
})