import React from 'react'
import LOGO from 'Assets/logo.png'
import { Text, View, ScrollView, Image } from 'react-native'
import {
  styles
} from './config'
import { List } from '@ant-design/react-native'
import { NavigationScreenProp } from 'react-navigation'

const Item = List.Item

interface Props {
  navigation: NavigationScreenProp<any>
}

class AboutUs extends React.Component<Props> {
  render() {
    return (
      <View style={styles.box}>
        <ScrollView>
          <View style={styles.topWrap}>
            <View style={styles.logoWrap}><Image source={LOGO} style={styles.logo} /></View>
            <View style={styles.appMsg}>
              <Text style={styles.appName}>钱包产品</Text>
              <Text style={styles.appVersion}>v1.01</Text>
            </View>
          </View>

          <View style={styles.listWrap}>
            <List>
              <Item arrow="horizontal" onPress={this.gotoFunctionIntr}><Text style={styles.listItem}>功能介绍</Text></Item>
              <Item extra={<Text style={styles.updateVersion} onPress={this.handleUpdateVersion}>V1.0.2</Text>}><Text style={styles.listItem}>版本更新</Text></Item>
              <Item arrow="horizontal" onPress={this.gotoUserProtocol}><Text style={styles.listItem}>用户协议</Text></Item>
            </List>
          </View>
        </ScrollView>
      </View>
    )
  }

  gotoFunctionIntr = () => {
    this.props.navigation.navigate('functionIntr')
  }

  gotoUserProtocol = () => {
    this.props.navigation.navigate('userProtocol')
  }

  // TODO
  handleUpdateVersion = () => {

  }
}

export default AboutUs
