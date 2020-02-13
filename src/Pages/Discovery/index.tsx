import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import i18n from 'I18n'
import { I18nDiscoveryType } from 'I18n/config'
import { WithTranslation, withTranslation } from 'react-i18next'
import Apps from './Apps'
import Contacts from './Contracts'
import Fortune from './Fortune'
import { styles } from './config'

interface State {
  activeIndex: number
}
interface Props {
  navigation: NavigationStackScreenProps['navigation']
  labels: I18nDiscoveryType
}

class Discovery extends React.Component<any, State> {
  _navListener: any
  constructor(props: any) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => { });
  }
  componentWillUnmount() {
    this._navListener.remove();
  }
  didFocus = () => {
    this.props.navigation.setParams({ title: i18n.t('dipperin:discovery.title') })
  }
  goGame = (name: string) => () => {
    this.props.navigation.navigate('game', {name})
  }
  render() {
    const { activeIndex } = this.state
    return (
      <SafeAreaView>
        <NavigationEvents
          onDidFocus={this.didFocus}
        />
        <View style={styles.wrap}>
          <View style={styles.tabs}>
            <Text
              onPress={() => this.tabsChange(0)}
              style={activeIndex === 0 ? { ...styles.item0, ...styles.item, ...styles.activeItem } : { ...styles.item, ...styles.item0 }}
            >
              {i18n.t('dipperin:discovery.tab1')}
            </Text>
            <Text
              onPress={() => this.tabsChange(1)}
              style={activeIndex === 1 ? { ...styles.item1, ...styles.item, ...styles.activeItem } : { ...styles.item, ...styles.item1 }}
            >
              {i18n.t('dipperin:discovery.tab2')}
            </Text>
            <Text
              onPress={() => this.tabsChange(2)}
              style={activeIndex === 2 ? { ...styles.item2, ...styles.item, ...styles.activeItem } : { ...styles.item, ...styles.item2 }}
            >
              {i18n.t('dipperin:discovery.tab3')}
            </Text>
          </View>
          {activeIndex === 0 && <Apps goGame={this.goGame}/>}
          {activeIndex === 1 && <Contacts />}
          {activeIndex === 2 && <Fortune />}
        </View>
      </SafeAreaView>
    )
  }
  tabsChange = (index: number) => {
    this.setState({
      activeIndex: index,
    })
  }
}


const AccountDetailWrap = (props: WithTranslation & { navigation: NavigationStackScreenProps['navigation'] }) => {
  const { t, navigation } = props
  const labels = t('dipperin:discovery') as I18nDiscoveryType
  return <Discovery labels={labels} navigation={navigation} />

}

export default withTranslation()(AccountDetailWrap)
