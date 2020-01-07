import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { NavigationScreenProp, ScrollView } from 'react-navigation'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { dataSource, ListItemPropsType } from '../config'

interface Props {
  navigation: NavigationScreenProp<any>
}

@observer
class HelpCenterDetail extends React.Component<Props> {
  @observable curId: string = ''

  constructor(props: Props) {
    super(props)
    this.getUrlParams()
  }

  @action getUrlParams = () => {
    this.curId = this.props.navigation.getParam('id')
  }

  render() {
    const data = dataSource.find((item: ListItemPropsType) => (item.id === this.curId))
    return (
      <View style={styles.box}>
        <ScrollView>
          <Text style={styles.content}>{data?.detail}</Text>
        </ScrollView>
      </View>
    )
  }
}

export default HelpCenterDetail

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc'
  },
  content: {
    padding: 10,
    backgroundColor: '#fff'
  }
})

