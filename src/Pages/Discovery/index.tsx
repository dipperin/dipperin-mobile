import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Apps from './Apps'
import Contacts from './Contracts'
import Fortune from './Fortune'
import { tabs, tabItemInterface } from './condifg'

interface State {
  activeIndex: number
}

class Discovery extends React.Component<any, State> {
  constructor (props:any) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  render() {
    const { activeIndex } = this.state
    return (
      <View style={styles.wrap}>
        <View style={styles.tabs}>
          <Text
            onPress={() => this.tabsChange(0)}
            style={activeIndex === 0 ? {...styles.item0, ... styles.activeItem, ...styles.item}: {...styles.item, ...styles.item0} }
          >
            热门应用
          </Text>
          <Text
            onPress={() => this.tabsChange(1)}
            style={activeIndex === 1 ? {...styles.item1, ... styles.activeItem, ...styles.item}: {...styles.item,...styles.item1} }
          >
            合约排行
          </Text>
          <Text
            onPress={() => this.tabsChange(2)}
            style={activeIndex === 2 ? {...styles.item2, ... styles.activeItem, ...styles.item}: {...styles.item, ...styles.item2} }
          >
            富豪榜
          </Text>
        </View>
        { activeIndex === 0 &&  <Apps /> }
        { activeIndex === 1 &&  <Contacts /> }
        { activeIndex === 2 &&  <Fortune /> }
      </View>
    )
  }
  // tabs change
  tabsChange = (index: number) => {
    this.setState({
      activeIndex: index
    })
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#0B0E19',
    paddingVertical: 9,
    height: '100%'
  },
  flexBlock: {
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  item: {
    minWidth: 94,
    textAlign:'center', 
    fontSize: 15,
    color: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderColor: '#1C77BC',
    borderWidth: 1
  },
  item0: {
    borderTopLeftRadius: 38,
    borderBottomLeftRadius: 38
  },
  item1: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  item2: {
    borderTopRightRadius: 38,
    borderBottomRightRadius: 38
  },
  activeItem: {
    backgroundColor: '#1C77BC'
  }
})

export default Discovery