import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text } from 'react-native'
import { observable } from 'mobx'
import { FlatList } from 'react-native-gesture-handler'
import i18n from 'I18n'
import { withTranslation, WithTranslation } from 'react-i18next'
import DiscoveryStore from 'Store/discovery'
import { fortuneInterface } from 'Global/inteface'
import { styles } from './config'
import { formatEllipsis } from '../config'
import { balancePercent } from 'Global/utils'

interface FortuneProps extends WithTranslation {
  discovery ?: DiscoveryStore
}

@inject('discovery')
@observer
class Fortune extends React.Component<FortuneProps> {

  componentDidMount () {
    this.props.discovery!.getBlockHeight()
    this.getFortuneList(1, 10)
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
          data={fortuneList}
          renderItem={({item, index}) => this.renderItem(item, index, totalBlocks)}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
  renderItem = (item:fortuneInterface, index:number, totalBlocks:number) => {
    console.log(totalBlocks,'totalBlocks')
    return (
      <View style={styles.tRow}>
        <Text style={styles.ranking}>{index +1}</Text>
        <Text style={styles.address}>{formatEllipsis(item.address)}</Text>
        <Text style={styles.balance}>{item.dip_balance}</Text>
        <Text style={styles.holdings}>{balancePercent(item.dip_balance, totalBlocks)}%</Text>
      </View>
    )
  }
  getFortuneList = (page: number, per_page: number) => {
    const params = { page, per_page }
    this.props.discovery!.getFortuneList(params)
  }
  onEndReached = () => {
    const {fortuneListPerPage, fortuneListCurPage, fortuneListTotalPage} = this.props.discovery!
    const curPage = fortuneListCurPage
    const perPage = fortuneListPerPage
    const totalPage = fortuneListTotalPage % fortuneListPerPage === 0 ? fortuneListTotalPage / fortuneListPerPage : Math.ceil(fortuneListTotalPage / fortuneListPerPage)
    if(curPage < totalPage){
      this.getFortuneList( curPage + 1, perPage )
    }
  }
}


export default withTranslation()(Fortune)