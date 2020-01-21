import TestRenderer from 'react-test-renderer'
import React from 'react'
import { View } from 'react-native'
import TxFeeBox from './index'

import { mockI18n } from 'tests/mocks/i18n'

describe('TxFeeBox', () => {
  let value = 1
  const handleChange = (num: number) => {
    value = num
  }
  const testRenderer = TestRenderer.create(
    <TxFeeBox
      labels={mockI18n.dipperin.transaction}
      value={value}
      handleChange={handleChange}
      fee={'0.000000000000001'}
    />,
  )
  const testInstance = testRenderer.root

  it('render', () => {
    // console.log(testRenderer.toJSON())
    // console.log(testInstance.findAllByType(View).map(el=>el.instance))
    expect(testInstance.findAllByType(View).length).toBeGreaterThan(0)
  })
})
