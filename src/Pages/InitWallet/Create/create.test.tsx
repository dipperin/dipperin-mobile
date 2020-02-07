import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Create } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import mockRootBuilder from 'tests/mocks/root'
import { resource } from 'I18n/config'
import { Toast } from 'Components/PopupWindow'
import { setStorage } from 'Db'
describe('Create', () => {
    const { wallet } = mockRootBuilder()
    const props = {
        wallet,
        labels: resource.en.dipperin.create,
        navigation: mockNavigation
    }
    const mockInfo = Toast.info = jest.fn()
    const mockLoaing = Toast.loading = jest.fn()
    const mockHide = Toast.hide = jest.fn()
    const mockSetStorage = setStorage as jest.Mock
    let component: ShallowWrapper<Create>, instance: Create
    beforeEach(() => {
        component = shallow(<Create {...props}/>).dive()
        instance = component.instance() as Create
        mockInfo.mockClear()
        mockLoaing.mockClear()
        mockHide.mockClear()
        mockSetStorage.mockClear()
        mockNavigation.navigate.mockClear()
    })

    it('render', () => {
        expect(component.find('View').length).toBeGreaterThan(0)
    })

    it('keyboardDidShow', () => {
        instance.keyboardDidShow()
        expect(instance.keyboardShow).toBe(true)
    })

    it('keyboardDidHide', () => {
        instance.keyboardDidHide()
        expect(instance.keyboardShow).toBe(false)
    })

    it('handleImport', async () => {
        instance.password = '12345678'
        instance.repeatPassword = '12345678'
        instance.passwordTip = '12345678'
        instance.agreeSelect = true
        await instance.handleCreate()
        expect(mockInfo).not.toBeCalled()
        expect(mockLoaing).toBeCalled()
        expect(mockHide).toBeCalled()
        expect(mockSetStorage.mock.calls[0][1]).toBe('12345678')
        expect(mockNavigation.navigate).toBeCalledWith('createStep1')
    })

    it('handleImport err', async () => {
        instance.password = '12345678'
        instance.repeatPassword = '1234567'
        instance.passwordTip = '12345678'
        instance.agreeSelect = true
        await instance.handleCreate()
        expect(mockInfo).toBeCalled()
    })

    it('handleChangePassword', () => {
        instance.handleChangePassword('aaa')
        expect(instance.password).toBe('aaa')
        instance.handleChangePassword('aaa我')
        expect(instance.password).toBe('aaa')
    })

    it('handleChangeRepeatPasword', () => {
        instance.handleChangeRepeatPasword('aaa')
        expect(instance.repeatPassword).toBe('aaa')
        instance.handleChangeRepeatPasword('aaa我')
        expect(instance.repeatPassword).toBe('aaa')
    })

    it('handleChangePasswordTip', () => {
        instance.handleChangePasswordTip('test')
        expect(instance.passwordTip).toBe('test')
    })

    it('handleChangeEye', () => {
        instance.securePassword = true
        instance.handleChangeEye()
        expect(instance.securePassword).toBe(false)
    })

    it('handleChangeSelect', () => {
        instance.agreeSelect = true
        instance.handleChangeSelect()
        expect(instance.agreeSelect).toBe(false)
    })

    it('showAgree', () => {
        instance.showAgree()
        expect(mockNavigation.navigate).toBeCalledWith('initUserProtocol')
    })
})
