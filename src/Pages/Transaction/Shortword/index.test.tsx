import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { Toast, Modal } from 'Components/PopupWindow'

jest.mock('Components/PopupWindow')
const mockToastSuccess = Toast.success as jest.Mock<typeof Toast.success>
const mockToastInfo = Toast.info as jest.Mock<typeof Toast.info>
const mockModalEnterPassword = Modal.enterPassword as jest.Mock<
  typeof Modal.enterPassword
>
const mockModalFingerprintPopShow = Modal.FingerprintPopShow as jest.Mock<
  typeof Modal.FingerprintPopShow
>
const mockModalHide = Modal.hide as jest.Mock<typeof Modal.hide>
// const mockToastLoading = Toast.loading as jest.Mock<typeof Toast.loading>

import { Shortword } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import mockRootBuilder from 'tests/mocks/root'

import { mockI18n } from 'tests/mocks/i18n'

describe('Send', () => {
  const mockRoot = mockRootBuilder(false)
  mockRoot.initWallet()
  const transaction = mockRoot.transaction
  const wallet = mockRoot.wallet
  const account = mockRoot.account
  const contract = mockRoot.contract
  const system = mockRoot.system
  let component: ShallowWrapper
  let instance: Shortword

  beforeEach(() => {
    component = shallow(
      <Shortword
        navigation={mockNavigation}
        labels={mockI18n.dipperin.transaction}
        transaction={transaction}
        wallet={wallet}
        account={account}
        contract={contract}
        system={system}
      />,
    ).dive()
    instance = component.instance() as Shortword
    mockToastInfo.mockClear()
    mockModalEnterPassword.mockClear()
    mockModalFingerprintPopShow.mockClear()
    mockModalHide.mockClear()
    mockToastSuccess.mockClear()
  })

  it('render', () => {
    expect(component.exists()).toBe(true)
  })

  it('keyboardShow', () => {
    instance.keyboardDidShow()
    const keyboardShow = instance.keyboardShow
    expect(keyboardShow).toBe(true)
  })

  it('keyboardDidHide', () => {
    instance.keyboardDidHide()
    const keyboardShow = instance.keyboardShow
    expect(keyboardShow).toBe(false)
  })

  it('handleChangeShortword', () => {
    instance.handleChangeShortword('x')
    expect(instance.shortword).toBe('x')
  })

  it('handleChangeTxfee', () => {
    instance.handleChangeTxfee(2)
    expect(instance.txFeeLevel).toBe(2)
  })

  it('turnBack', async () => {
    mockNavigation.goBack.mockClear()
    await instance.turnBack()
    expect(mockNavigation.goBack).toHaveBeenCalled()
  })

  it('register', async () => {
    contract.registerShortword = jest
      .fn()
      .mockResolvedValueOnce({ success: true, result: '0x00' })
    const result = await instance.register()
    expect(result.success).toBe(true)
  })

  it('verifyShortword empty short word', async () => {
    const labels = mockI18n.dipperin.transaction
    const res = await instance.verifyShortword()
    expect(res).toBe(false)
    expect(mockToastInfo.mock.calls[0][0]).toBe(labels.emptyShortword)
  })

  it('verifyShortword: The shortword is used', async () => {
    const labels = mockI18n.dipperin.transaction
    instance.handleChangeShortword('x')
    contract.queryAddressByShordword = jest
      .fn()
      .mockResolvedValueOnce('0x0000E660bFeCFbe590Eee1E27e09793af92C9cc11061')
    const res = await instance.verifyShortword()
    expect(res).toBe(false)
    expect(mockToastInfo.mock.calls[0][0]).toBe(labels.registeredShortword)
  })

  it('verifyShortword: The address has registered', async () => {
    const labels = mockI18n.dipperin.transaction
    instance.handleChangeShortword('x')
    contract.queryAddressByShordword = jest
      .fn()
      .mockResolvedValueOnce('')
    contract.queryShortwordByAddr = jest.fn().mockResolvedValueOnce('y')
    const res = await instance.verifyShortword()
    expect(res).toBe(false)
    expect(mockToastInfo.mock.calls[0][0]).toBe(labels.registeredAddr)
  })

  it('verifyShortword pass', async () => {
    instance.handleChangeShortword('x')
    contract.queryAddressByShordword = jest
      .fn()
      .mockResolvedValueOnce('')
    contract.queryShortwordByAddr = jest.fn().mockResolvedValueOnce('')
    const res = await instance.verifyShortword()
    expect(res).toBe(true)
  })

  it('handleSend Fingerpay', async() => {
    instance.handleChangeShortword('x')
    contract.queryAddressByShordword = jest
      .fn()
      .mockResolvedValueOnce('')
    contract.queryShortwordByAddr = jest.fn().mockResolvedValueOnce('')
    system.setFingerPay(true)
    await instance.handleSend()
    expect(mockModalFingerprintPopShow).toHaveBeenCalled()
  })

  it('handleSend password', async() => {
    instance.handleChangeShortword('x')
    contract.queryAddressByShordword = jest
      .fn()
      .mockResolvedValueOnce('')
    contract.queryShortwordByAddr = jest.fn().mockResolvedValueOnce('')
    system.setFingerPay(false)
    await instance.handleSend()
    expect(mockModalEnterPassword).toHaveBeenCalled()
  })

  it('handleFingerprintFailCb', ()=> {
    instance.handleFingerprintFailCb()
    expect(mockModalHide).toHaveBeenCalled()
    expect(mockModalEnterPassword).toHaveBeenCalled()
  })

  it('handleFingerprintSuccessCb', async () => {
    await instance.handleFingerprintSuccessCb()
    expect(mockModalEnterPassword).toHaveBeenCalled()
  })

  it('handleConfirmTransaction', async ()=> {
    jest.useFakeTimers()
    wallet.checkPassword = jest.fn().mockReturnValue(true)
    contract.registerShortword = jest
      .fn()
      .mockResolvedValueOnce({ success: true, result: '0x00' })
    await instance.handleConfirmTransaction('password')
    jest.runAllTicks()
    expect(mockToastSuccess).toHaveBeenCalled()
  })
})
