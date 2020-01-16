import React from 'react'
// import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { userProtocol } from './userProtocol'

class UserProtocol extends React.Component {
  render() {
    return (
      <WebView source={{html: userProtocol}} />
    )
  }
}

export default UserProtocol
