import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import * as config from './config'
import { Icon } from 'Components/Icon'
import { styles, MeItemProps } from './config'
import { NavigationScreenProp } from 'react-navigation'
import i18n from 'I18n'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nMeType } from 'I18n/config'

interface Props {
  navigation: NavigationScreenProp<any>
  labels: I18nMeType
}

class Me extends React.Component<Props> {
  _navListener: any
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('#fff');
    });
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.title}>{i18n.t('dipperin:me.personalCenter')}</Text>
        {this.renderItems()}
      </View>
    )
  }
  renderItems = (): JSX.Element[] => {
    return config.MeListItems(this.props.labels).map((item: MeItemProps, index: number): JSX.Element => {
      const _styles = index === 0 ? [styles.item, styles.firstItem] : styles.item
      return (
        <TouchableOpacity
          key={index}
          style={_styles}
          onPress={() => this.clickItem(item)}
          activeOpacity={0.8}
        >
          <View style={styles.itemContent}>
            <Icon name={item.iconName} size={24} color={item.iconColor} />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <Icon name={'icon|xiangyou'} size={16} color="#aeaeae" />
        </TouchableOpacity>
      )
    })
  }

  clickItem = (item: MeItemProps) => {
    if (!item.routeName) return
    this.props.navigation.navigate(item.routeName)
  }
}

const MeWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:me') as I18nMeType
  return <Me labels={labels} navigation={navigation} />
}

export default withTranslation()(MeWrap)