import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import { Toast, Modal } from 'Components/PopupWindow'

jest.mock('Components/PopupWindow')
const mockToastInfo = Toast.info as jest.Mock<typeof Toast.info>
const mockToastSuccess = Toast.success as jest.Mock<typeof Toast.success>
const mockModalEnterPassword = Modal.enterPassword as jest.Mock<
  typeof Modal.enterPassword
>
const mockModalFingerprintPopShow = Modal.FingerprintPopShow as jest.Mock<
  typeof Modal.FingerprintPopShow
>
const mockModalHide = Modal.hide as jest.Mock<typeof Modal.hide>
// const mockToastLoading = Toast.loading as jest.Mock<typeof Toast.loading>

import { Receive } from './index'
import { mockNavigation } from 'tests/mocks/navigation'
import mockRootBuilder from 'tests/mocks/root'

import { mockI18n } from 'tests/mocks/i18n'

describe('Receive', () => {
  const mockRoot = mockRootBuilder(false)
  // mockRoot.initWallet()
  // const transaction = mockRoot.transaction
  // const wallet = mockRoot.wallet
  const account = mockRoot.account
  const contract = mockRoot.contract
  // const system = mockRoot.system
  let component: ShallowWrapper
  let instance: Receive

  beforeAll(async () => {
    await mockRoot.initWallet()
  })

  beforeEach(() => {
    component = shallow(
      <Receive
        navigation={mockNavigation}
        labels={mockI18n.dipperin.transaction}
        // transaction={transaction}
        // wallet={wallet}
        account={account}
        contract={contract}
        // system={system}
      />,
    ).dive()
    instance = component.instance() as Receive
    mockToastInfo.mockClear()
    mockModalEnterPassword.mockClear()
    mockModalFingerprintPopShow.mockClear()
    mockModalHide.mockClear()
    mockToastSuccess.mockClear()
  })

  it('render', () => {
    console.log(component)
    expect(component.exists()).toBe(true)
  })

  it('setShareContent', () => {
    mockNavigation.setParams = jest.fn()
    instance.setShareContent('test')
    expect(mockNavigation.setParams).toHaveBeenCalled()
  })

  it('queryShortword', async () => {
    contract.queryShortwordByAddr = jest.fn().mockResolvedValueOnce('abb')
    await instance.queryShortword(
      '0x000085E15e074806F1d123a2Bd925D2c60D627Fd8b2e',
    )
    expect(contract.queryShortwordByAddr).toHaveBeenCalled()
  })

  it('handleClose', () => {
    mockNavigation.goBack = jest.fn()
    instance.handleClose()
    expect(mockNavigation.goBack).toHaveBeenCalled()
  })

  it('turnToShortword', () => {
    mockNavigation.navigate = jest.fn()
    instance.turnToShortword()
    expect(mockNavigation.navigate.mock.calls[0][0]).toBe('shortword')
  })

  it('copyToClickboard', () => {
    instance.copyToClickboard()
    expect(mockToastSuccess).toHaveBeenCalled()
  })

  it('copyShortwordToClickboard', () => {
    instance.copyShortwordToClickboard()
    expect(mockToastSuccess).toHaveBeenCalled()
  })
})
