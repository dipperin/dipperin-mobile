import React from 'react'
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import AuthorityPop from './AuthorityPop'
import { I18nGameType } from 'I18n/config'
import { NavigationScreenProp, NavigationEvents } from 'react-navigation'
import { getWhiteList, addWhiteList } from 'Db'
import { WithTranslation, withTranslation } from 'react-i18next'
import AccountStore from 'Store/account'
import DiscoveryStore from 'Store/discovery'

interface Props {
    discovery?: DiscoveryStore
    account?: AccountStore
    navigation: NavigationScreenProp<any>
    label: I18nGameType
}

@inject('account', 'discovery')
@observer
class Game extends React.Component<Props> {
    @observable isShowAuthorityPop: boolean = false
    webView: any

    didFocus = async() => {
        // dapp send success callback
        const type = this.props.navigation.getParam('type')
        const dappName = this.props.navigation.getParam('name')

        if (type === 'dappSend') {
            this.sendSuccessCb()
        }
        const whiteList = await getWhiteList()
        if (!whiteList.includes(dappName)) {
            this.openAuthorityPop()
        }
    }

    @action
    openAuthorityPop = () => {
        this.isShowAuthorityPop = true
    }
    @action
    hideAuthorityPop = () => {
        this.isShowAuthorityPop = false
    }
    cancelAuthority=()=>{
        this.hideAuthorityPop()
        this.props.navigation.goBack()
    }

    authorize = async () => {
        const dappName = this.props.navigation.getParam('name')
        await addWhiteList(dappName)
        this.hideAuthorityPop()
    }

    handleMessage = async (e: any) => {
        try {
            const message = e.nativeEvent.data
            const data = JSON.parse(message)
            if (data.type === 'dappSend') {
                const { name, amount, extraData, address } = data
                const params = {
                    type: 'dappSend',
                    name,
                    amount,
                    extraData,
                    address,
                }
                this.props.navigation.navigate('send', params)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    getDappUri = () => {
        const dappName = this.props.navigation.getParam('name')
        const { appsList } = this.props.discovery!
        const currentApp = appsList.find(app => app.name === dappName)
        if (currentApp && currentApp.app_play_url) {
            return currentApp.app_play_url
        }
    }

    dappLoaded = () => {
        this.initAddress()
    }

    initAddress = () => {
        const message = {
            type: 'init',
            address: this.props.account!.activeAccount!.address,
        }
        this.webView.postMessage(JSON.stringify(message))
    }

    sendSuccessCb = () => {
        const dappName = this.props.navigation.getParam('name')
        const amount = this.props.navigation.getParam('amount')
        const extraData = this.props.navigation.getParam('extraData')
        const hash = this.props.navigation.getParam('hash')
        const messageData = {
            type: 'dappSend',
            name: dappName,
            amount,
            extraData,
            hash,
        }
        this.webView.postMessage(JSON.stringify(messageData))
    }

    render() {
        const { label } = this.props
        const dappUri = this.getDappUri()
        const dappName = this.props.navigation.getParam('name')
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={this.didFocus} />
                <WebView
                // source={{uri:'http://192.168.1.3:3002/'}}
                    source={{ uri: dappUri || '' }}
                    onMessage={this.handleMessage}
                    ref={ref => this.webView = ref}
                    onLoadEnd={this.dappLoaded}
                />
                <AuthorityPop
                    language={label}
                    visible={this.isShowAuthorityPop}
                    cancelText={label.cancel}
                    confrimText={label.confirmAuthority}
                    onCancel={this.cancelAuthority}
                    onConfirm={this.authorize}
                    dappName={dappName}
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
