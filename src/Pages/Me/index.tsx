import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as config from './config'
import { Icon } from 'Components/Icon'
import { styles, MeItemProps } from './config'

class Me extends React.Component<any> {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.title}>个人中心</Text>
        {this.renderItems()}
      </View>
    )
  }

  renderItems = (): JSX.Element[] => {
    return config.MeListItems.map((item: MeItemProps, index: number): JSX.Element => {
      const _styles = index === 0 ? [styles.item, styles.firstItem] : styles.item
      return (
        <TouchableOpacity 
          key={index} 
          style={_styles} 
          onPress={() => this.clickItem(item)} 
          activeOpacity={0.8}
        >
          <View style={styles.itemContent}>
            <Icon name={item.iconName} size={22} color="#adadad" />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <Icon name={'icon|xiangyou'} size={16} color="#aeaeae" />
        </TouchableOpacity>
      )
    })
  }

  clickItem = (item: MeItemProps) => {
    if (!item.routeName) return
    this.props.navigation.push(item.routeName)
  }
}

export default Me