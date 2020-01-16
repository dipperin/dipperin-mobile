import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import i18n from 'I18n'
import { withTranslation, WithTranslation } from 'react-i18next'
import DiscoveryStore from 'Store/discovery'
import { contractInterface } from 'Global/inteface'
import { styles } from './config'
import { formatEllipsis } from '../config'

interface ContractsProps extends WithTranslation {
  discovery?: DiscoveryStore
}
@inject('discovery')
@observer
class Contracts extends React.Component<ContractsProps> {

  componentDidMount(){
    this.init()
  }

  init = async (page:number = 1, per_page: number = 10, order_by:string = 'dip_balance', asc_and_desc: string = 'asc') => {
    const params = {
      page,
      per_page,
      order_by,
      asc_and_desc,
    }
    await this.props.discovery!.getContractList(params)
  }
  render() {
    const { contractsList } = this.props.discovery!
    return (
      <View style={styles.wrap}>
        <View style={{...styles.tRow, ...styles.tHeader}}>
          <Text style={styles.address}>{i18n.t('dipperin:discovery.contracts.address')}</Text>
          <Text style={styles.name}>{i18n.t('dipperin:discovery.contracts.name')}</Text>
          <Text style={styles.balance}>{i18n.t('dipperin:discovery.contracts.balance')}</Text>
          <Text style={styles.txcount}>{i18n.t('dipperin:discovery.contracts.txCount')}</Text>
        </View>
        <FlatList 
          data={contractsList}
          renderItem={({item}) => this.renderItem(item)}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
        />
      </View>
    )
  }
  renderItem = (item:contractInterface) => {
    return (
      <View style={styles.tRow}>
        <Text style={styles.address}>{formatEllipsis(item.address)}</Text>
        <Text style={styles.name}>{item.contract_name}</Text>
        <Text style={styles.balance}>{item.dip_balance}</Text>
        <Text style={styles.txcount}>{item.tx_count}</Text>
      </View>
    )
  }
  onEndReached = () => {
    const {contractsListPerPage, contractsListCurPage , contractsListTotalPage} = this.props.discovery!
    const curPage = contractsListCurPage
    const perPage = contractsListPerPage
    const totalPage = contractsListTotalPage
    if(curPage < totalPage){
      this.init( curPage + 1, perPage )
    }
  }
}


export default withTranslation()(Contracts)