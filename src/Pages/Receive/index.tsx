import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
  HeaderBackButtonProps,
} from 'react-navigation-stack';
import QRCode from 'react-native-qrcode-svg';

import {label} from './config';

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#666',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    margin: 30,
    backgroundColor: '#ffff',
    borderRadius: 20,
    alignItems: 'center',
  },
  qrcodeWrapper: {
    marginTop: 30,
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  addressContent: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: 300,
    flexDirection: 'row',
    padding: 20,
  },
  address: {
    width: 230,
  },
  copy: {
    width: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
    height: 50,
    borderRadius: 25,
    width: 200,
  },
  btnSend: {
    height: 30,
    // borderRadius: 15,
  },
});

class Receive extends React.Component<NavigationStackScreenProps> {
  static navigationOptions: NavigationStackOptions = {
    title: label.receive,
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#666',
      elevation: 0,
    },
    headerLeft: (props: HeaderBackButtonProps) => (
      <TouchableWithoutFeedback
        style={{height: 30, width: 30}}
        onPress={props.onPress}>
        <Text style={{fontSize: 30, color: '#fff'}}>{'<'}</Text>
      </TouchableWithoutFeedback>
    ),
    headerRight: () => <Text>分享</Text>,
  };
  handleClose = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#666" />
        <View style={styles.mainContent}>
          <View style={styles.qrcodeWrapper}>
            <QRCode
              value={'0x0000351f283c318f43da159048Ded9542c20f1DFe89C'}
              size={200}
            />
          </View>
          <View style={styles.addressWrapper}>
            <Text>地址</Text>
            <View style={styles.addressContent}>
              <Text style={styles.address}>
                {'0x0000351f283c318f43da159048Ded9542c20f1DFe89C'}
              </Text>
              <Text style={styles.copy}>复制</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnWrapper} activeOpacity={0.8}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 250,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#149bd5',
              }}>
              <Text style={{color: '#fff', fontSize: 17}}>口令收款</Text>
            </View>
          </TouchableOpacity>
          {/* <Button title={'关闭'} onPress={this.handleClose} /> */}
        </View>
      </View>
    );
  }
}

export default Receive;
