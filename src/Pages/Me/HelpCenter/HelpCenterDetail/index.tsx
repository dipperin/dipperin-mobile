import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationScreenProp, ScrollView } from 'react-navigation'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { dataSource, ListItemPropsType } from '../config'
import { WithTranslation, withTranslation } from 'react-i18next'
import { I18nMeType } from 'I18n/config'

interface Props {
  label: I18nMeType
  navigation: NavigationScreenProp<any>
}

@observer
export class HelpCenterDetail extends React.Component<Props> {
  @observable curId: string = ''

  constructor(props: Props) {
    super(props)
    this.getUrlParams()
  }

  @action getUrlParams = async () => {
    this.curId = await this.props.navigation.getParam('id')
  }

  render() {
    const data = dataSource(this.props.label).find((item: ListItemPropsType) => (item.id === this.curId))
    return (
      <View style={styles.box}>
        <ScrollView>
          <View style={styles.content}>{data?.detail}</View>
        </ScrollView>
      </View>
    )
  }
}

const HelpCenterDetailWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
  const { t, navigation } = props
  const labels = t('dipperin:me') as I18nMeType
  return <HelpCenterDetail label={labels} navigation={navigation} />
}

export default withTranslation()(HelpCenterDetailWrap)

export const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  content: {
    padding: 10,
    backgroundColor: '#fff'
  }
})

