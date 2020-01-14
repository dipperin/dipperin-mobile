import React from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import i18n from 'I18n'
import { withTranslation } from 'react-i18next'
import Apps from './Apps'
import Contacts from './Contracts'
import Fortune from './Fortune'
import { styles } from './config'

interface State {
  activeIndex: number
}

class Discovery extends React.Component<any, State> {
  _navListener: any
  constructor (props:any) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  componentDidMount() {
      this._navListener = this.props.navigation.addListener('didFocus', () => {
        StatusBar.setBackgroundColor('#0B0E19')
        StatusBar.setBarStyle('light-content')
      });
  }
  componentWillUnmount() {
    this._navListener.remove();
    this.setState({
      activeIndex: 0
    })
  }
  render() {
    const { activeIndex } = this.state
    return (
      <SafeAreaView style={{ backgroundColor: '#0B0E19' }}>
        <View style={styles.wrap}>
          <View style={styles.tabs}>
            <Text
              onPress={() => this.tabsChange(0)}
              style={activeIndex === 0 ? {...styles.item0, ... styles.activeItem, ...styles.item}: {...styles.item, ...styles.item0} }
            >
              {i18n.t('dipperin:discovery.tab1')}
            </Text>
            <Text
              onPress={() => this.tabsChange(1)}
              style={activeIndex === 1 ? {...styles.item1, ... styles.activeItem, ...styles.item}: {...styles.item,...styles.item1} }
            >
              {i18n.t('dipperin:discovery.tab2')}
            </Text>
            <Text
              onPress={() => this.tabsChange(2)}
              style={activeIndex === 2 ? {...styles.item2, ... styles.activeItem, ...styles.item}: {...styles.item, ...styles.item2} }
            >
              {i18n.t('dipperin:discovery.tab3')}
            </Text>
          </View>
          { activeIndex === 0 &&  <Apps /> }
          { activeIndex === 1 &&  <Contacts /> }
          { activeIndex === 2 &&  <Fortune /> }
        </View>
      </SafeAreaView>
    )
  }
  tabsChange = (index: number) => {
    this.setState({
      activeIndex: index
    })
  }
}

export default withTranslation()(Discovery)