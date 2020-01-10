import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { fortuneInterface } from 'Global/inteface'
import { styles } from './config'
import { formatEllipsis } from '../config'
import { balancePercent } from 'Global/utils'

interface FortuneProps {
  discovery ?: DiscoveryStore
}
interface State {
  page: number
  per_page:number
}
@inject('discovery')
@observer
class Fortune extends React.Component<FortuneProps, State> {
  constructor (props:FortuneProps) {
    super(props)
    this.state = {
      page: 1,
      per_page: 10,
    }
  }
  componentDidMount () {
    const { getBlockHeight } = this.props.discovery!
    getBlockHeight()
    this.getFortuneList()
  }
  getFortuneList = () => {
    const { getFortuneList } = this.props.discovery!
    const { page, per_page } = this.state
    const params = {
      page,
      per_page
    }
    getFortuneList(params)
  }
  render() {
    const { fortuneList, totalBlocks } = this.props.discovery!
    return (
      <View style={styles.wrap}>
        <View style={{...styles.tRow, ...styles.tHeader}}>
          <Text style={styles.ranking}>{i18n.t('dipperin:discovery.fortune.ranking')}</Text>
          <Text style={styles.address}>{i18n.t('dipperin:discovery.fortune.address')}</Text>
          <Text style={styles.balance}>{i18n.t('dipperin:discovery.fortune.balance')}</Text>
          <Text style={styles.holdings}>{i18n.t('dipperin:discovery.fortune.holdings')}</Text>
        </View>
        <FlatList 
          data={fortuneList.account_list}
          renderItem={({item, index}) => this.renderItem(item, index, totalBlocks)}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
        />
      </View>
    )
  }
  renderItem = (item:fortuneInterface, index:number, totalBlocks:number) => {
    return (
      <View style={styles.tRow}>
        <Text style={styles.ranking}>{index +1}</Text>
        <Text style={styles.address}>{formatEllipsis(item.address)}</Text>
        <Text style={styles.balance}>{item.dip_balance} DIP</Text>
        <Text style={styles.holdings}>{balancePercent(item.balance, totalBlocks)}%</Text>
      </View>
    )
  }
  onEndReached = () => {
    const {fortuneList: {total_count}} = this.props.discovery!
    const { page, per_page } = this.state
    const totalPage = total_count % per_page === 0 ? total_count / per_page : Math.ceil(total_count / per_page)
    if(page < totalPage){
      this.setState({
        page: page +1
      },() => this.getFortuneList())
    }
  }
}


export default Fortune