import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ChangePassword } from './index'

import mockRootBuilder from 'tests/mocks/root'
import { mockNavigation } from 'tests/mocks/navigation'
import { mockI18n } from 'tests/mocks/i18n'
import { Toast } from 'Components/PopupWindow'

jest.mock('Components/PopupWindow')
const mockToastInfo = Toast.info as jest.Mock<typeof Toast.info>

describe('ChangePassword function', () => {
    let component: ShallowWrapper
    let instance: ChangePassword
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const system = mockRoot.system
    const wallet = mockRoot.wallet
    let props = {
        system,
        wallet,
        navigation: mockNavigation,
        label: mockI18n.dipperin.me,
    }
    beforeEach(() => {
        component = shallow(<ChangePassword {...props}/>).dive()
        instance = component.instance() as ChangePassword
        mockToastInfo.mockClear()
    })

    it('render function', () => {
        expect(component.find('View').length).toBeGreaterThanOrEqual(6)
    })

    it('resetWallet function', () => {
        system.resetWallet = jest.fn()
        instance.resetWallet()
        expect(system.resetWallet).toBeCalled()
        expect(mockNavigation.navigate).toBeCalledWith('start')
    })

    it('goBack function', () => {
        instance.goBack()
        expect(mockNavigation.goBack).toBeCalled()
    })

    it('changePassword function 1', async () => {
        instance.oldPassword = ''
        await instance.changePassword()
        expect(mockToastInfo).toBeCalled()
    })
    it('changePassword function 2', async () => {
        instance.oldPassword = 'test4567'
        instance.newPassword = 'test1237'
        instance.confrimPassword = 'test1237'
        wallet.unlockWallet = jest.fn().mockReturnValueOnce(false)
        await instance.changePassword()
        expect(mockToastInfo).toBeCalled()
    })
    it('changePassword function 3', async () => {
        instance.oldPassword = 'test4567'
        instance.newPassword = 'test1237'
        instance.confrimPassword = 'test1237'
        mockNavigation.navigate = jest.fn()
        wallet.unlockWallet = await jest.fn().mockReturnValueOnce(true)
        wallet.changePassword = await jest.fn().mockReturnValueOnce(false)
        await instance.changePassword()
        expect(mockNavigation.navigate).toBeCalledWith('settings')
    })
    it('changePassword function 4', async () => {
        instance.oldPassword = 'test4567'
        instance.newPassword = 'test1237'
        instance.confrimPassword = 'test1237'
        wallet.unlockWallet = jest.fn().mockReturnValueOnce(true)
        wallet.changePassword = jest.fn().mockReturnValueOnce(true)
        await instance.changePassword()
        expect(mockToastInfo).toBeCalled()
    })

    it('showResetWalletPop Function', () =>{
        instance.isShowResetWalletPop = false
        instance.showResetWalletPop()
        expect(instance.isShowResetWalletPop).toBeTruthy()
    })

    it('hideResetWalletPop Function', () => {
        instance.isShowResetWalletPop = true
        instance.hideResetWalletPop()
        expect(instance.isShowResetWalletPop).toBeFalsy()
    })

    it('inputPasswordTip Function', () => {
        instance.inputPasswordTip('test')
        expect(instance.passwordTip).toBe('test')
    })

    it('inputOldPassword Function', () => {
        instance.inputOldPassword('testOld名')
        expect(instance.oldPassword).toBe('testOld')
    })

    it('inputNewPassword function', () => {
        instance.inputNewPassword('new大写')
        expect(instance.newPassword).toBe('new')
    })

    it('inputConfirmPassword functions', () => {
        instance.inputConfirmPassword('confirm企')
        expect(instance.confrimPassword).toBe('confirm')
    })
})



