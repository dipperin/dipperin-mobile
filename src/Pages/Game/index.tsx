import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import AuthorityPop from './AuthorityPop'
import { I18nGameType } from 'I18n/config'
import { NavigationScreenProp } from 'react-navigation'
import { getWhiteList, addWhiteList } from 'Db'
import { WithTranslation, withTranslation } from 'react-i18next'

interface Props {
    navigation: NavigationScreenProp<any>
    label: I18nGameType
}


@observer
class Game extends React.Component<Props> {
    @observable isShowAuthorityPop: boolean = false
    @observable gameName: string = ''
    @action
    openAuthorityPop = () => {
        this.isShowAuthorityPop = true
    }
    @action
    hideAuthorityPop = () => {
        this.isShowAuthorityPop = false
    }
    authorize = async () => {
        await addWhiteList(this.gameName)
        this.hideAuthorityPop()
    }

    handleMessage = (e: any) => {
        this.hideAuthorityPop()
        try {
            const gameName = e.nativeEvent.data
            this.gameName = gameName
        } catch (error) {
            console.log(error.message);
        }
    }
    render() {
        const { label } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.openAuthorityPop}>
                    <Text>Authority</Text>
                </TouchableOpacity>
                <WebView
                    source={{ uri: 'https://www.baidu.com' }}
                    onMessage={this.handleMessage}
                />
                <AuthorityPop
                    language={label}
                    visible={this.isShowAuthorityPop}
                    cancelText={label.cancel}
                    confrimText={label.confirmAuthority}
                    onCancel={this.hideAuthorityPop}
                    onConfirm={this.authorize}
                />
            </View>
        )

    }
}



const GameWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
    const { t, navigation } = props
    const labels = t('dipperin:game') as I18nGameType
    return <Game label={labels} navigation={navigation} />
}

export default withTranslation()(GameWrap)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
