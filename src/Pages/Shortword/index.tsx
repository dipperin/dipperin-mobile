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
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {label} from './config';

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  sendAmountInput: {
    alignSelf: 'center',
    width: '95%',
    overflow: 'hidden',
    fontSize: 18,
  },
  ExtraDataWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  txFeeWrapper: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  txFeeBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txFeeBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    height: 50,
    borderRadius: 25,
  },
  btnSend: {
    height: 30,
    // borderRadius: 15,
  },
});

@observer
class Shortword extends React.Component<NavigationStackScreenProps> {
  static navigationOptions: NavigationStackOptions = {
    title: label.shortWordReceive,
    headerTitleStyle: {
      backgroundColor: '#fff',
      textAlign: 'center',
    },
    headerRight: () => <Text>扫一扫</Text>,
  };

  validateEnteringAmount(amountString: string) {
    const reg = new RegExp('^[0-9]*(.[0-9]{0,18})?$');
    return reg.test(amountString);
  }

  @observable toAddress: string = '';
  @observable accountBalance: number = 0;
  @observable sendAmount: string = '';
  @observable extraData: string = '';

  @action handleChangeToAddress = (text: string) => {
    this.toAddress = text;
  };
  @action handleChangeSendAmount = (amountString: string) => {
    if (this.validateEnteringAmount(amountString)) {
      this.sendAmount = amountString;
    }
  };
  @action handleChangeExtraData = (text: string) => {
    if (text.length < 200) {
      this.extraData = text;
    }
  };

  handleSend = () => {
    console.warn(this.toAddress);
  };
  render() {
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#fff" />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.mainWrapper}
          testID={'first-incoming-transaction-screen'}
          resetScrollToCoords={{x: 0, y: 0}}>
          <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
            <View style={styles.toAddressLabel}>
              <Text>{label.Shortword}</Text>
            </View>
            <TextInput
              style={styles.toAddressInput}
              value={this.toAddress}
              onChangeText={this.handleChangeToAddress}
              placeholder={label.enterAddressOrWord}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendAmountWrapper}
            activeOpacity={0.8}>
            <View style={styles.sendAmountBar}>
              <Text>{label.sendAmount}</Text>
              <Text>{`${this.accountBalance} DIP`}</Text>
            </View>
            <TextInput
              style={styles.sendAmountInput}
              value={this.sendAmount}
              onChangeText={this.handleChangeSendAmount}
              placeholder={label.enterAmount}
              keyboardType="numeric"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.ExtraDataWrapper} activeOpacity={0.8}>
            <Text style={{height: '100%', lineHeight: 50, fontSize: 18}}>
              {label.remark}
            </Text>
            <TextInput
              style={styles.sendAmountInput}
              value={this.extraData}
              onChangeText={this.handleChangeExtraData}
              placeholder={label.optional}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
            <View style={styles.txFeeBar}>
              <Text>{label.txFee}</Text>
              <Text>1.060494606 DIP ≈ $ 0.63</Text>
            </View>
            <Slider minimumValue={1} maximumValue={3} step={1} />
            <View style={styles.txFeeBottomBar}>
              <Text>低</Text>
              <Text>中</Text>
              <Text>高</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnWrapper}
            onPress={this.handleSend}
            activeOpacity={0.8}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 400,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#149bd5',
              }}>
              <Text style={{color: '#fff', fontSize: 17}}>{label.send}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Shortword;
