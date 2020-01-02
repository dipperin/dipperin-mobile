import React from 'react'
import { View, Text } from 'react-native'
import * as config from './config'
import { Icon } from 'Components/Icon'

class Me extends React.Component<any> {
  render() {
    return (
      <View>
        {this.renderItems()}
      </View>
    )
  }

  renderItems = (): JSX.Element[] => {
    return config.MeListItems.map((item, index: number): JSX.Element => {
      return (
        <View key={index}>
          <Icon name={'icon|shezhi'} size={20} color="#adadad"/>
          <Text>{item.title}</Text>
          <Icon name={'icon|xiangyou'} size={20} color="#333"/>
        </View>
      )
    })
  }
}

export default Me