import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { fortuneInterface } from 'Global/inteface'
import { styles } from './config'
import { formatEllipsis } from '../config'

interface FortuneProps {
  discovery: DiscoveryStore
}
@inject('discovery')
@observer
class Fortune extends React.Component<FortuneProps> {
  render() {
    const mockData=[{
      sort: 1,
      adress: '0X0000485737748892',
      name: 'test name',
      over: '56,565.235698',
      holdings: '16,234'
    },{
      sort:2,
      adress: '0X0000485737748892',
      name: 'test name',
      over: '56,565.235698',
      holdings: '16,234'
    }]
    return (
      <View style={styles.wrap}>
        <View style={{...styles.tRow, ...styles.tHeader}}>
          <Text style={styles.sort}>{i18n.t('dipperin:discovery.fortune.sort')}</Text>
          <Text style={styles.adress}>{i18n.t('dipperin:discovery.fortune.account')}</Text>
          <Text style={styles.name}>{i18n.t('dipperin:discovery.fortune.over')}</Text>
          <Text style={styles.over}>{i18n.t('dipperin:discovery.fortune.holdings')}</Text>
        </View>
        <FlatList 
          data={mockData}
          renderItem={({item}) => this.renderItem(item)}
        />
      </View>
    )
  }
  renderItem = (item:fortuneInterface) => {
    return (
      <View style={styles.tRow}>
        <Text style={styles.sort}>{item.sort}</Text>
        <Text style={styles.adress}>{formatEllipsis(item.adress)}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.over}>{item.over}</Text>
      </View>
    )
  }
}


export default Fortune