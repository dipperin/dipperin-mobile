import React from 'react'
import {Text} from 'react-native'
import { shallow, ShallowWrapper } from 'enzyme'
import RootView from './index'

describe("RootView Page test", () => {
  let component: ShallowWrapper, instance: RootView

  beforeEach(() => {
    component = shallow(<RootView />)
    instance = component.instance() as RootView
  })

  it('render function', () => {
    expect(component.find('View').length).toBeGreaterThan(0)
  })

  it('setView function', () => {
    RootView.setView(<Text/>)
    expect(component.find('Text').length).toBeGreaterThan(0)
  })
})

