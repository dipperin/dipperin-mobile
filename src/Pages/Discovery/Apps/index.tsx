import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { appsInterface, appsResourceInterface } from 'Global/inteface'
import { styles } from './config'
import { host } from 'Server/http'

interface AppsProps {
  discovery?: DiscoveryStore
}
interface State {
  page: number
  per_page: number
  order_by: string
  as_and_desc: string
}
@inject('discovery')
@observer

class Apps extends React.Component<AppsProps, State> {
  constructor(props:AppsProps){
    super(props)
    this.state ={
      page: 1,
      per_page: 10,
      order_by: 'balance',
      as_and_desc: 'asc'
    }
  }
  componentDidMount(){
    this.getAppsList()
  }

  getAppsList = async () => {
    const { page, per_page, as_and_desc, order_by } = this.state
    const initParams = {
      page,
      per_page,
      as_and_desc,
      order_by
    }
    await this.props.discovery!.getAppsList(initParams)
  }

  render() {
    const { appsList, appResource } = this.props.discovery!
    return (
      <View style={styles.wrap}>
        <FlatList
          data={appsList.app_data!}
          renderItem={({item}) => this.renderItem(item,appResource)}
          ListFooterComponent={() => <View style={styles.more}><Text>{i18n.t('dipperin:discovery.apps.moreDapp')}</Text></View>}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
        />
     </View>
    )
  }
  onEndReached = () => {
    const {appsList} = this.props.discovery!
    const { page } = this.state
    if(page < appsList.total_page!){
      this.setState({
        page: page +1
      },() => this.getAppsList())
    }
  }
  renderItem = (item:appsInterface, appResource:appsResourceInterface[]) => {
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <Image source={{uri:`${host}${appResource.filter((k:appsResourceInterface) => k.name === item.name)[0].image_url}`}} style={styles.iamge} />
        </View>
        <View style={styles.right}>
          <View style={styles.intro}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.type}>{appResource.filter((k:appsResourceInterface) => k.name === item.name)[0].classification}</Text>
          </View>
          <View style={styles.data}>
            <View style={styles.info}>
              <Text style={styles.grayLabel}>{i18n.t('dipperin:discovery.apps.accounts')}:</Text>
              <Text style={styles.blueText}>{item.user_count}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.grayLabel}>{i18n.t('dipperin:discovery.apps.txCount')}:</Text>
              <Text style={styles.blueText}>{item.tx_count}</Text>
            </View>
          </View>
          <View style={styles.flex}>
              <Text style={styles.grayLabel}>{i18n.t('dipperin:discovery.apps.value')}:</Text>
              <Text style={styles.blueText}>{item.tx_amount}DIP</Text>
          </View>
        </View>
      </View>
    )
  }
}


export default Apps