import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from '@ant-design/react-native'
import { styles, dataSource, ListItemPropsType } from './config'
import { NavigationScreenProp } from 'react-navigation'

const Item = List.Item


interface Props {
  navigation: NavigationScreenProp<any>
}

class HelpCenter extends React.Component<Props> {
  render() {
    return (
      <View style={styles.box}>
        <ScrollView>
          <List renderHeader={(<Text style={styles.subTitle}>常见问题</Text>)}>
            {this.renderItems()}
          </List>
        </ScrollView>
      </View>
    )
  }

  renderItems = (): JSX.Element[] => {
    return dataSource.map((item: ListItemPropsType, index: number): JSX.Element => {
      return ( 
        <Item key={index} arrow="horizontal" onPress={() => this.goDetail(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </Item>
      )
    })
  }

  goDetail = (item: ListItemPropsType) => {
    this.props.navigation.navigate('helpCenterDetail', {id: item.id})
  }
}

export default HelpCenter
