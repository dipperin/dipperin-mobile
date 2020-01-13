import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import { action, observable } from "mobx"
import { RNCamera } from "react-native-camera"
import React from "react"
import { NavigationScreenProp } from "react-navigation"
import _ from "lodash"
import { Utils } from "@dipperin/dipperin.js"
import Toast from 'Components/Toast';

interface Props {
    navigation: NavigationScreenProp<any>
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
    debonceOnCodeRead = _.debounce(this.onBarCodeRead, 4000)

    render() {
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
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                        <Animated.View style={[
                            styles.border,
                            { transform: [{ translateY: this.moveAnim }] }]} />
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        );
    }
}

export default ScanScreen;

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