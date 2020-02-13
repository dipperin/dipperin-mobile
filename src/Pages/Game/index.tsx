import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import AuthorityPop from './AuthorityPop'
import { I18nGameType } from 'I18n/config'
import { NavigationScreenProp, NavigationEvents } from 'react-navigation'
import { getWhiteList, addWhiteList } from 'Db'
import { WithTranslation, withTranslation } from 'react-i18next'
import AccountStore from 'Store/account'

interface Props {
    account?: AccountStore
    navigation: NavigationScreenProp<any>
    label: I18nGameType
}

@inject('account')
@observer
class Game extends React.Component<Props> {
    @observable isShowAuthorityPop: boolean = false
    @observable gameName: string = ''
    webView: any

    didFocus = () => {
       // dapp send success callback
       const type = this.props.navigation.getParam('type')
       if(type === 'dappSend') {
           this.sendSuccessCb()
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
    authorize = async () => {
        await addWhiteList(this.gameName)
        this.hideAuthorityPop()
    }

    handleMessage = (e: any) => {
        try {
            const message = e.nativeEvent.data
            // this.gameName = gameName
            console.log('message', message)
            const data = JSON.parse(message)
            if(data.type === 'dappSend') {
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
        switch(dappName) {
            // TODO app name && app rui
            case 'richBet':
                return 'http://10.0.2.2:3000'
            default:
                return 'http://10.0.2.2:3000'
        }
    }

    dappLoaded = () => {
        console.log('aaaaaaaaaaaa')
        this.initAddress()
    }

    initAddress = () => {
        const message = {
            type: 'init',
            address: this.props.account!.activeAccount!.address
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
            hash
        }
        console.log('diddddd', messageData)
        this.webView.postMessage(JSON.stringify(messageData))
    }

    render() {
        const { label } = this.props
        const dappUri = this.getDappUri()
        console.log(dappUri, 'uuuuuuuuuu')
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={this.didFocus} />
                <TouchableOpacity onPress={this.openAuthorityPop}>
                    <Text>Authority</Text>
                </TouchableOpacity>
                <WebView
                    source={{ uri: dappUri }}
                    onMessage={this.handleMessage}
                    ref={ref => this.webView = ref}
                    onLoadEnd={this.dappLoaded}
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
