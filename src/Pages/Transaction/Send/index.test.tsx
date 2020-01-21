// import TestRenderer, {
//   ReactTestRenderer,
//   ReactTestInstance,
// } from 'react-test-renderer'
import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { Toast, Modal } from 'Components/PopupWindow'

jest.mock('Components/PopupWindow')
const mockToastInfo = Toast.info as jest.Mock<typeof Toast.info>
const mockModalEnterPassword = Modal.enterPassword as jest.Mock<
  typeof Modal.enterPassword
>
const mockModalFingerprintPopShow = Modal.FingerprintPopShow as jest.Mock<
  typeof Modal.FingerprintPopShow
>
const mockModalHide = Modal.hide as jest.Mock<typeof Modal.hide>
// const mockToastLoading = Toast.loading as jest.Mock<typeof Toast.loading>

import { Send } from './index'
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
  let instance: Send

  beforeEach(() => {
    component = shallow(
      <Send
        navigation={mockNavigation}
        labels={mockI18n.dipperin.transaction}
        transaction={transaction}
        wallet={wallet}
        account={account}
        contract={contract}
        system={system}
      />,
    ).dive()
    instance = component.instance() as Send
    mockToastInfo.mockClear()
    mockModalEnterPassword.mockClear()
    mockModalFingerprintPopShow.mockClear()
    mockModalHide.mockClear()
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

  it('handleChangeToAddress', () => {
    instance.handleChangeToAddress(
      '0x0000E660bFeCFbe590Eee1E27e09793af92C9cc11061',
    )
    expect(instance.toAddress).toBe(
      '0x0000E660bFeCFbe590Eee1E27e09793af92C9cc11061',
    )
  })

  it('handleChangeAddressOrShortword', () => {
    instance.handleChangeAddressOrShortword('password')
    expect(instance.addressOrShortWord).toBe('password')
  })

  it('handleChangeSendAmount', () => {
    instance.handleChangeSendAmount('1')
    expect(instance.sendAmount).toBe('1')
  })

  it('handleChangeExtraData', () => {
    instance.handleChangeExtraData('extra data')
    expect(instance.extraData).toBe('extra data')
  })

  it('handleChangeTxfee', () => {
    instance.handleChangeTxfee(2)
    expect(instance.txFeeLevel).toBe(2)
  })

  it('verifyAddressOrShortword', async () => {
    contract.queryAddressByShordword = jest.fn()
    await instance.verifyAddressOrShortword()
    expect(mockToastInfo.mock.calls[0][0]).toBe(
      mockI18n.dipperin.transaction.emptyAddrOrShortword,
    )
  })

  it('verifyAmount', () => {
    instance.verifyAmount()
    expect(mockToastInfo.mock.calls[0][0]).toBe(
      mockI18n.dipperin.transaction.emptySendAmount,
    )
  })

  it('verifyBalance', () => {
    instance.verifyBalance()
    expect(mockToastInfo.mock.calls[0][0]).toBe(
      mockI18n.dipperin.transaction.noEnoughBalance,
    )
  })

  it('getAddressFromClickboard', async () => {
    await instance.getAddressFromClickboard()
    expect(instance.addressOrShortWord).toBe('')
  })

  it('queryShortWord', async () => {
    contract.queryAddressByShordword = jest
      .fn()
      .mockResolvedValue('0x0000E660bFeCFbe590Eee1E27e09793af92C9cc11061')
    await instance.queryShortWord('1')
    expect(instance.addressOrShortWord).toBe('1')
  })

  it('sendTransaction', async () => {
    transaction.confirmTransaction = jest
      .fn()
      .mockResolvedValueOnce({ success: true, result: 'hash' })
    const result = await instance.sendTransaction()
    expect(result.success).toBe(true)
  })

  it('handleSend', async () => {
    instance.handleChangeAddressOrShortword(
      '0x0000E660bFeCFbe590Eee1E27e09793af92C9cc11061',
    )
    instance.handleChangeSendAmount('1')
    account.changeActiveAccount('1')
    account.activeAccount!.updateBalance(String(10 ** 20))
    await instance.handleSend()
    expect(mockModalEnterPassword).toHaveBeenCalled()
  })

  it('handleConfirmTransaction', async () => {
    wallet.checkPassword = jest.fn().mockReturnValue(true)
    instance.handleChangeAddressOrShortword(
      '0x0000E660bFeCFbe590Eee1E27e09793af92C9cc11061',
    )
    instance.handleChangeSendAmount('1')
    account.changeActiveAccount('1')
    account.activeAccount!.updateBalance(String(10 ** 20))
    const spyOnsend = jest.spyOn(instance, 'sendTransaction')
    transaction.confirmTransaction = jest
      .fn()
      .mockResolvedValueOnce({ success: true, result: 'hash' })
    await instance.handleConfirmTransaction('12345678')
    expect(spyOnsend).toHaveBeenCalled()
  })

  it('backToAccountDetail', async()=>{
    mockNavigation.dispatch = jest.fn()
    await instance.backToAccountDetail()
    expect(mockNavigation.dispatch).toHaveBeenCalled()
  })
})
