import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { contractInterface } from 'Global/inteface'
import { styles } from './config'
import { formatEllipsis } from '../config'

interface ContractsProps {
  discovery?: DiscoveryStore
}
interface State {
  page: number
  per_page: number
}
@inject('discovery')
@observer
class Contracts extends React.Component<ContractsProps, State> {
  constructor(props:ContractsProps){
    super(props)
    this.state ={
      page: 0,
      per_page: 10
    }
  }
  componentDidMount(){
    this.init()
  }

  init = async () => {
    const { page, per_page } = this.state
    const params = {
      page,
      per_page
    }
    await this.props.discovery!.getContractList()
  }
  render() {
    const { contractsList } = this.props.discovery!
    return (
      <View style={styles.wrap}>
        <View style={{...styles.tRow, ...styles.tHeader}}>
          <Text style={styles.address}>{i18n.t('dipperin:discovery.contracts.address')}</Text>
          <Text style={styles.name}>{i18n.t('dipperin:discovery.contracts.name')}</Text>
          <Text style={styles.txcount}>{i18n.t('dipperin:discovery.contracts.txCount')}</Text>
          <Text style={styles.value}>{i18n.t('dipperin:discovery.contracts.value')}</Text>
        </View>
        <FlatList 
          data={contractsList}
          renderItem={({item}) => this.renderItem(item)}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
  renderItem = (item:contractInterface) => {
    return (
      <View style={styles.tRow}>
        <Text style={styles.address}>{formatEllipsis(item.adress)}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.txcount}>{item.over}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    )
  }
}


export default Contracts