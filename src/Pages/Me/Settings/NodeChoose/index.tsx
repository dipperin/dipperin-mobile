import React from 'react'
import { View } from 'react-native'
import { styles } from './config'
import { List, Radio } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react';
import { NET } from 'Global/constants';
import i18n from 'I18n'
import ChainData from 'Store/chainData';

const RadioItem = Radio.RadioItem;

interface DataSourceType {
  label: string
  value: NET
}

interface Props {
  chainData: ChainData
}

@inject('chainData')
@observer
export class NodeChoose extends React.Component<Props> {
  render() {
    const dataSource = [
      {
        label: i18n.t('dipperin:me.remoteNode') + ' - ' + i18n.t('dipperin:me.venus'),
        value: NET.VENUS,
      },
      {
        label: i18n.t('dipperin:me.remoteNode') + ' - ' + i18n.t('dipperin:me.mercury'),
        value: NET.TEST,
      },
    ]

    return (
      <View style={styles.box}>
        <List>
          {dataSource.map((item: DataSourceType, index: number) => {
            return (
              <RadioItem
                key={index}
                checked={this.props.chainData.currentNet === item.value}
                onChange={this.handleChange(item.value)}
              >{item.label}</RadioItem>
            )
          })}
        </List>
      </View>
    )
  }

  handleChange = (_value: NET) => () => {
    this.props.chainData.changeNet(_value)
    // TODO
  }
}

export default NodeChoose
