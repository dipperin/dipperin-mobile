import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from '@ant-design/react-native'
import { styles, dataSource, ListItemPropsType } from './config'
import { NavigationScreenProp } from 'react-navigation'
import { withTranslation, WithTranslation } from 'react-i18next'
import { I18nMeType } from 'I18n/config'

const Item = List.Item

interface Props {
  label: I18nMeType
  navigation: NavigationScreenProp<any>
}


export class HelpCenter extends React.Component<Props> {
  render() {
    const { label } = this.props
    return (
      <View style={styles.box}>
        <ScrollView>
          <List renderHeader={(<Text style={styles.subTitle}>{label.commonProblems}</Text>)}>
            {this.renderItems()}
          </List>
        </ScrollView>
      </View>
    )
  }

  renderItems = (): JSX.Element[] => {
    return dataSource(this.props.label).map((item: ListItemPropsType, index: number): JSX.Element => {
      return (
        <Item key={index} arrow="horizontal" onPress={() => this.goDetail(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </Item>
      )
    })
  }

  goDetail = (item: ListItemPropsType) => {
    this.props.navigation.navigate('helpCenterDetail', { id: item.id })
  }
}

const HelpCenterWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:me') as I18nMeType
  return <HelpCenter label={labels} navigation={navigation} />
}

export default withTranslation()(HelpCenterWrap)
