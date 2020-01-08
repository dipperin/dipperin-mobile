import React from 'react'
import { View, TouchableNativeFeedbackBase } from 'react-native'
import { dataSource, styles } from './config'
import { List, Radio } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { VENUS } from 'Global/constants';
import System from 'Store/System';

const RadioItem = Radio.RadioItem;

interface DataSourceType {
  label: string
  value: string
}

interface Props {
  system: System
}

@inject('system')
@observer
class NodeChoose extends React.Component<Props> {
  render() {
    return (
      <View style={styles.box}>
        <List>
          {dataSource.map((item: DataSourceType, index: number) => {
            return (
              <RadioItem
                key={index}
                checked={this.props.system.curSystemNodeAddr === item.value}
                onChange={() => this.handleChange(item.value)}
              >{item.label}</RadioItem>
            )
          })}
        </List>
      </View>
    )
  }

  handleChange = (_value: string) => {
    this.props.system.setCurSystemNodeAddr(_value)
    // TODO 
  }
}

export default NodeChoose
