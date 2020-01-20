// import TestRenderer from 'react-test-renderer'
import { shallow, ShallowWrapper } from 'enzyme'

import React from 'react'
// import { View } from 'react-native'
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
  // const testRenderer = TestRenderer.create(
  //   <Send
  //     navigation={mockNavigation}
  //     labels={mockI18n.dipperin.transaction}
  //     transaction={transaction}
  //     wallet={wallet}
  //     account={account}
  //     contract={contract}
  //     system={system}
  //   />,
  // )
  // const testInstance = testRenderer.root

  let component: ShallowWrapper
  // let instance: Send

  beforeEach(() => {
    // Use shallowWrapper.dive() at the top Instead of shallowWrapper.dive().someMethod,
    // Because this will cause the mock method to fail.
    component = shallow(<Send
      navigation={mockNavigation}
      labels={mockI18n.dipperin.transaction}
      transaction={transaction}
      wallet={wallet}
      account={account}
      contract={contract}
      system={system}
    />).dive()
    // instance = component.instance() as Send
  })

  it('render', () => {
    // console.log(testRenderer.toJSON())
    // console.log(testInstance.findAllByType(View).map(el=>el.instance))
    // expect(testInstance.findAllByType(View).length).toBeGreaterThan(0)
    expect(component.exists()).toBe(true)
  })
})
