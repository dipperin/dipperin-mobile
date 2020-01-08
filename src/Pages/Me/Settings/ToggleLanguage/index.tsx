import React from 'react'
import { View } from 'react-native'
import { List, Radio } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { dataSource, styles } from './config'
import System from 'Store/System';
import i18next from 'i18next';

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

  // Toggle Langueage
  @action handleChange = (_value: string) => {
    this.props.system.setCurLanguage(_value)
    // TODO toggle language
    i18next.changeLanguage(_value)
  }
}

export default ToggleLanguage
