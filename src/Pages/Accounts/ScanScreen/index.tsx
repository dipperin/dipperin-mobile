import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import { action, observable } from "mobx"
import { RNCamera } from "react-native-camera"
import React from "react"
import { NavigationScreenProp } from "react-navigation"
import _ from "lodash"
import { Utils } from "@dipperin/dipperin.js"
import { Toast } from 'Components/PopupWindow'
import { I18nAccountType } from 'I18n/config'
import { WithTranslation, withTranslation } from 'react-i18next'

interface Props {
    navigation: NavigationScreenProp<any>
    labels: I18nAccountType
}


class ScanScreen extends React.Component<Props> {
    @observable camera: any
    @observable moveAnim: Animated.Value = new Animated.Value(0)
    componentDidMount() {
        this.startAnimation();
    }
    startAnimation = () => {
        this.moveAnim.setValue(0);
        Animated.timing(
            this.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };
    //  scan the qrcode
    onBarCodeRead = (result: any) => {
        const { data } = result;
        if (!Utils.isAddress(data)) {
            Toast.info('wrong address')
            return
        }
        this.props.navigation.navigate('send', { address: data })
    };
    //get the camera
    @action
    getCarema = (ref: any) => {
        this.camera = ref
    }
    // debonce code Read
    debonceOnCodeRead = _.debounce(this.onBarCodeRead, 500)

    render() {
        const { labels } = this.props
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.debonceOnCodeRead}
                    androidCameraPermissionOptions={{
                        title: labels.caremaTitle,
                        message: labels.caremaMessage,
                        buttonPositive: labels.buttonPositive,
                        buttonNegative: labels.buttonNegative,
                    }}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                        <Animated.View style={[
                            styles.border,
                            { transform: [{ translateY: this.moveAnim }] }]} />
                        <Text style={styles.rectangleText}>{labels.codeTip}</Text>
                    </View>
                </RNCamera>
            </View>
        );
    }
}


const ScanScreenWrap = (props: WithTranslation & { navigation: NavigationScreenProp<any> }) => {
    const { t, navigation } = props
    const labels = t('dipperin:account') as I18nAccountType
    return <ScanScreen labels={labels} navigation={navigation} />
}

export default withTranslation()(ScanScreenWrap)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});