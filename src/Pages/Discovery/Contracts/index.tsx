import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { contractInterface } from 'Global/inteface'
import { styles } from './config'
import { formatEllipsis } from '../config'

interface AppsProps {
  discovery: DiscoveryStore
}
@inject('discovery')
@observer
class Contracts extends React.Component<AppsProps> {
  componentDidMount(){
    this.init()
  }

  init = async () => {
    await this.props.discovery!.getContractList()
  }
  render() {
    const mockData=[{
      adress: '0X0000485737748892',
      name: 'test name',
      over: '56,565.235698',
      holdings: '16,234'
    },{
      adress: '0X0000485737748892',
      name: 'test name',
      over: '56,565.235698',
      holdings: '16,234'
    }]
    // const { contractsList } = this.props.discovery!
    return (
      <View style={styles.wrap}>
        <View style={{...styles.tRow, ...styles.tHeader}}>
          <Text style={styles.adress}>{i18n.t('dipperin:discovery.contracts.contractsAdress')}</Text>
          <Text style={styles.name}>{i18n.t('dipperin:discovery.contracts.contractsName')}</Text>
          <Text style={styles.over}>{i18n.t('dipperin:discovery.contracts.over')}</Text>
          <Text style={styles.holdings}>{i18n.t('dipperin:discovery.contracts.transactionsNumber')}</Text>
        </View>
        <FlatList 
          data={mockData}
          renderItem={({item}) => this.renderItem(item)}
        />
      </View>
    )
  }
  renderItem = (item:contractInterface) => {
    return (
      <View style={styles.tRow}>
        <Text style={styles.adress}>{formatEllipsis(item.adress)}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.over}>{item.over}</Text>
        <Text style={styles.holdings}>{item.holdings}</Text>
      </View>
    )
  }
}


export default Contracts