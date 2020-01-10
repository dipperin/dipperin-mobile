import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { appsInterface } from 'Global/inteface'
import { styles } from './config'

interface AppsProps {
  discovery: DiscoveryStore
}
@inject('discovery')
@observer

class Apps extends React.Component<AppsProps> {
  componentDidMount(){
    this.init()
  }

  init = async () => {
    await this.props.discovery!.getAppsList()
  }

  render() {
    const { appsList } = this.props.discovery!
    return (
      <View style={styles.wrap}>
        <FlatList 
          data={appsList}
          renderItem={({item}) => this.renderItem(item)}
          ListFooterComponent={() => <View style={styles.more}><Text>更多DApp敬请期待</Text></View>}
        />
     </View>
    )
  }
  renderItem = (item:appsInterface) => {
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <Image source={{uri:`${item.image_url}`}} style={styles.iamge} />
        </View>
        <View style={styles.right}>
          <View style={styles.intro}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.type}>{item.classification}</Text>
          </View>
          <View style={styles.data}>
            <View style={styles.info}>
              <Text style={styles.grayLabel}>{i18n.t('dipperin:discovery.apps.users')}:</Text>
              <Text style={styles.blueText}>{item.user_count}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.grayLabel}>{i18n.t('dipperin:discovery.apps.transactionsNumber')}:</Text>
              <Text style={styles.blueText}>{item.tx_count}</Text>
            </View>
          </View>
          <View style={styles.flex}>
              <Text style={styles.grayLabel}>{i18n.t('dipperin:discovery.apps.transactionsValue')}:</Text>
              <Text style={styles.blueText}>{item.tx_amount}DIP</Text>
          </View>
        </View>
      </View>
    )
  }
}


export default Apps