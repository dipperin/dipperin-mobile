import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Slider,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';

const styles = StyleSheet.create({
  mainWrapper: {
    // backgroundColor: '#fafbfc',
    backgroundColor: '#aaa',
    flex: 1,
  },
  wrapper: {
    flex: Platform.OS === 'android' ? 0 : 1,
  },
  toAddressWrapper: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  toAddressLabel: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    fontSize: 30,
  },
  toAddressInput: {
    alignSelf: 'center',
    width: '95%',
    overflow: 'hidden',
    fontSize: 18,
  },
  sendAmountWrapper: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  sendAmountBar: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  sendAmountInput: {
    alignSelf: 'center',
    width: '95%',
    overflow: 'hidden',
    fontSize: 18,
  },
  ExtraDataWrapper: {
    backgroundColor: '#fff',
  },
  txFeeWrapper: {
    backgroundColor: '#fff',
    marginTop: 20
  },
  txFeeBar: {
    padding: 10,
  } 
});

@observer
class Send extends React.Component<NavigationStackScreenProps> {
  static navigationOptions: NavigationStackOptions = {
    title: '转账',
    headerTitleStyle: {
      backgroundColor: '#fff',
      textAlign: 'center',
    },
  };

  @observable toAddress: string = '';
  @observable accountBalance: number = 0;

  handleSend = () => {
    console.warn(this.toAddress);
  };

  @action handleChangeToAddress = (text: string) => {
    this.toAddress = text;
  };

  render() {
    return (
      <View style={styles.mainWrapper}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.mainWrapper}
          testID={'first-incoming-transaction-screen'}
          resetScrollToCoords={{x: 0, y: 0}}>
          <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
            <View style={styles.toAddressLabel}>
              <Text>合约地址</Text>
            </View>
            <TextInput
              style={styles.toAddressInput}
              value={this.toAddress}
              onChangeText={this.handleChangeToAddress}
              placeholder={'请输入地址或口令'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendAmountWrapper}
            activeOpacity={0.8}>
            <View style={styles.sendAmountBar}>
              <Text>发送金额</Text>
              <Text>{`${this.accountBalance} DIP`}</Text>
            </View>
            <TextInput
              style={styles.sendAmountInput}
              value={this.toAddress}
              onChangeText={this.handleChangeToAddress}
              placeholder={'输入金额'}
              keyboardType="numeric"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ExtraDataWrapper}
            activeOpacity={0.8}>
            <Text>备注</Text>
            <Text>(选填)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.txFeeWrapper}
            activeOpacity={0.8}>
            <View style={styles.txFeeBar}>
              <Text>交易费</Text>
              <Text>1.060494606 DIP ≈ $ 0.63</Text>
            </View>
            <Slider 
              maximumValue={3}  
            />
          </TouchableOpacity>

          <View>

          <Button title={'发送'} onPress={this.handleSend} />
          </View>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Send;
