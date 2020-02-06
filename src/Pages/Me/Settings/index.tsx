/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import {
  settingListItemsMain,
  settingListItemsExt,
  styles,
  FINGER_UNLOCK,
  LANGEUAGE,
} from './config'
import { List } from '@ant-design/react-native'
import { inject, observer } from 'mobx-react'
import System from 'Store/System'
import { AntdListItemPropsType } from 'Global/inteface'
import { Modal } from 'Components/PopupWindow'
import ChainData from 'Store/chainData'

const Item = List.Item

interface Props {
  navigation: NavigationScreenProp<any>
  system: System
  chainData: ChainData
}

@inject('system', 'chainData')
@observer
export class Settings extends React.Component<Props> {
  render() {
    const { system, chainData } = this.props
    const mainOptions = {
      extraOnChange: this.handleListMainChange,
      onChangeItem: this.goToChangePassword,
    }
    const extOptions = {
      onChangeItem: this.handleExtRoute,
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfc' }}>
        <ScrollView>
          <List>
            {this.renderItem(settingListItemsMain(system, mainOptions))}
          </List>
          <List renderHeader={<View style={{ marginBottom: 10 }} />}>
            {this.renderItem(settingListItemsExt(system, chainData, extOptions))}
          </List>
        </ScrollView>
      </View>
    )
  }

  renderItem = (data: AntdListItemPropsType[]): JSX.Element[] => {
    return data.map((item: AntdListItemPropsType, index: number) => {
      return (
        <Item
          key={index}
          extra={item.extra}
          arrow={item.arrow}
          onPress={item.onPress}
        >
          <Text style={styles.listItem}>{item.title}</Text>
        </Item>
      )
    })
  }

  handleListMainChange = (key: string, value: boolean) => {
    Modal.hide()
    if (key === FINGER_UNLOCK) {
      this.props.system.setFingerUnLock(value)
      return
    }
    this.props.system.setFingerPay(value)
  }

  goToChangePassword = (_keyWord: string) => {
    this.props.navigation.navigate('changePassword')
  }

  handleExtRoute = (_keyWord: string) => {
    if (_keyWord === LANGEUAGE) {
      this.props.navigation.navigate('toggleLanguage')
      return
    }
    this.props.navigation.navigate('nodeChoose')
  }
}

export default Settings
