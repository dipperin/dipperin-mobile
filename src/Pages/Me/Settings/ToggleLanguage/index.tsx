import React from 'react'
import { Text, View } from 'react-native'
import { List, Radio } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { dataSource, styles } from './config'
import { LANGUAGE } from 'Global/constants';
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
class ToggleLanguage extends React.Component<Props> {
  render() {
    return (
      <View style={styles.box}>
        <List>
          {dataSource.map((item: DataSourceType, index: number) => {
            return (
              <RadioItem 
                key={index}
                checked={this.props.system.curLanguage === item.value}
                onChange={() => this.handleChange(item.value)}
              >{item.label}</RadioItem>
            )
          })}
        </List>
      </View>
    )
  }

  // TODO
  @action handleChange = (_value: string) => {
    this.props.system.setCurLanguage(_value)
    // TODO toggle language
  }
}

export default ToggleLanguage
