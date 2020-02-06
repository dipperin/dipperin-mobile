import React from 'react'
import { View } from 'react-native'

export class ScrollView extends React.Component {
  render() {
    return <View>{this.props.children}</View>
  }
}
