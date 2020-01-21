import TestRenderer from 'react-test-renderer'
import React from 'react'
import { View } from 'react-native'
import ExtraDataBox from './index'

import { mockI18n } from 'tests/mocks/i18n'

describe('ExtraDataBox', () => {
  let value = ''
  const handleChange = (text: string) => {
    value = text
  }
  const testRenderer = TestRenderer.create(
    <ExtraDataBox
      labels={mockI18n.dipperin.transaction}
      value={value}
      handleChange={handleChange}
    />,
  )
  const testInstance = testRenderer.root

  it('render', () => {
    // console.log(testRenderer.toJSON())
    // console.log(testInstance.findAllByType(View).map(el=>el.instance))
    expect(testInstance.findAllByType(View).length).toBeGreaterThan(0)
  })
})
