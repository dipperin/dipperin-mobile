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
import {withTranslation, WithTranslation} from 'react-i18next';
import {I18nTransactionType} from 'I18n/config';

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

interface Props {
  navigation: NavigationStackScreenProps['navigation']
  labels: I18nTransactionType;
}

@observer
class Send extends React.Component<Props> {


  validateEnteringAmount(amountString: string) {
    const reg = new RegExp('^[0-9]*(.[0-9]{0,18})?$');
    return reg.test(amountString);
  }

  validateExtraData(text: string) {
    if (text.length > 200) {
      return false;
    }
    // --- add new rule here
    return true;
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
    if (this.validateExtraData(text)) {
      this.extraData = text;
    }
  };

  handleSend = () => {
    console.warn(this.toAddress);
  };
  render() {
    const {labels} = this.props
    return (
      <View style={styles.mainWrapper}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          style={styles.mainWrapper}
          testID={'first-incoming-transaction-screen'}
          resetScrollToCoords={{x: 0, y: 0}}>
          <TouchableOpacity style={styles.toAddressWrapper} activeOpacity={0.8}>
            <View style={styles.toAddressLabel}>
              <Text>{labels.toAddress}</Text>
            </View>
            <TextInput
              style={styles.toAddressInput}
              value={this.toAddress}
              onChangeText={this.handleChangeToAddress}
              placeholder={labels.enterAddressOrWord}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendAmountWrapper}
            activeOpacity={0.8}>
            <View style={styles.sendAmountBar}>
              <Text>{labels.sendAmount}</Text>
              <Text>{`${this.accountBalance} DIP`}</Text>
            </View>
            <TextInput
              style={styles.sendAmountInput}
              value={this.sendAmount}
              onChangeText={this.handleChangeSendAmount}
              placeholder={labels.enterAmount}
              keyboardType="numeric"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.ExtraDataWrapper} activeOpacity={0.8}>
            <Text style={{height: '100%', lineHeight: 50, fontSize: 18}}>
              {labels.remark}
            </Text>
            <TextInput
              style={styles.sendAmountInput}
              value={this.extraData}
              onChangeText={this.handleChangeExtraData}
              placeholder={labels.optional}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.txFeeWrapper} activeOpacity={0.8}>
            <View style={styles.txFeeBar}>
              <Text>{labels.txFee}</Text>
              <Text>1.060494606 DIP ≈ $ 0.63</Text>
            </View>
            <Slider minimumValue={1} maximumValue={3} step={1} />
            <View style={styles.txFeeBottomBar}>
              <Text>{labels.low}}</Text>
              <Text>{labels.middle}</Text>
              <Text>{labels.high}</Text>
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
              <Text style={{color: '#fff', fontSize: 17}}>{labels.send}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const Wrapped = (
  props: WithTranslation & {
    navigation: NavigationStackScreenProps['navigation'];
  },
) => {
  const {t, navigation} = props;
  const labels = t('dipperin:transaction') as I18nTransactionType;
  return <Send labels={labels} navigation={navigation} />;
};

export default withTranslation()(Wrapped);
