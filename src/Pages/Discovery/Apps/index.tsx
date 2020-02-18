import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { WithTranslation, withTranslation } from 'react-i18next'
import i18n from 'I18n'
import DiscoveryStore from 'Store/discovery'
import { appsInterface, appsResourceInterface } from 'Global/inteface'
import { styles } from './config'
import { host } from 'Server/http'

interface AppsProps extends WithTranslation {
  discovery?: DiscoveryStore
  goGame: (name: string) => () => void
}
@inject('discovery')
@observer
class Apps extends React.Component<AppsProps> {
  componentDidMount() {
    this.getAppsList()
  }

  getAppsList = async (page: number = 1, per_page: number = 10, as_and_desc: string = 'asc', order_by: string = 'balance') => {
    const initParams = {
      page,
      per_page,
      as_and_desc,
      order_by,
    }
    await this.props.discovery!.getAppsList(initParams)
  }

  render() {
    const { appsList, appResource } = this.props.discovery!
    return (
      // TODO app name && app link
      <View style={styles.wrap}>
        <FlatList
          data={appsList}
          renderItem={({ item }) => this.renderItem(item, appResource)}
          ListFooterComponent={() => <View><Text style={styles.more}>{i18n.t('dipperin:discovery.apps.moreDapp')}</Text></View>}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
        />
      </View>
    )
  }
  onEndReached = () => {
    const { appsListTotalPage, appsListCurPage, appsListPerPage } = this.props.discovery!
    const curPage = appsListCurPage
    const perPage = appsListPerPage
    const totalPage = appsListTotalPage
    if (totalPage === 1) { return; }
    if (curPage < totalPage) {
      this.getAppsList(curPage + 1, perPage)
    }
  }
  renderItem = (item: appsInterface, appResource: appsResourceInterface[]) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={this.props.goGame(item.name)}>
      <View style={styles.item}>

        <View style={styles.left}>
          <Image source={{ uri: `${host}${appResource.filter((k: appsResourceInterface) => k.name === item.name)[0].image_url}` }} style={styles.iamge} />
        </View>
        <View style={styles.right}>
          <View style={styles.intro}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.type}>{appResource.filter((k: appsResourceInterface) => k.name === item.name)[0].classification}</Text>
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
      </TouchableOpacity>

    )
  }
}


export default withTranslation()(Apps)
