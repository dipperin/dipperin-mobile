import { shallow } from 'enzyme'
import React from 'react'
import { UserProtocol } from './index'
import { WebView } from 'react-native-webview'

describe('UserProtocol page', () => {
    it('render', () => {
        let component = shallow(<UserProtocol />)
        expect(component.find(WebView).length).toBe(1)
    })
})
