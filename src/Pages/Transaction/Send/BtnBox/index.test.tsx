import TestRenderer from 'react-test-renderer'
import React from 'react'
import { View } from 'react-native'
import BtnBox from './index'

import { mockI18n } from 'tests/mocks/i18n'

describe('BtnBox', () => {
  const testRenderer = TestRenderer.create(
    <BtnBox labels={mockI18n.dipperin.transaction} onPress={() => {}} />,
  )
  const testInstance = testRenderer.root

  it('render', () => {
    // console.log(testRenderer.toJSON())
    // console.log(testInstance.findAllByType(View).map(el=>el.instance))
    expect(testInstance.findAllByType(View).length).toBeGreaterThan(0)
  })
})
