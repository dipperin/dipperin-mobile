import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
  HeaderBackButtonProps,
} from 'react-navigation-stack';
import QRCode from 'react-native-qrcode-svg';
import {withTranslation, WithTranslation} from 'react-i18next';
import {I18nTransactionType} from 'I18n/config';

import {styles} from './config';
import {observer, inject} from 'mobx-react';
import AccountStore from 'Store/account';

interface Props {
  navigation: NavigationStackScreenProps['navigation'];
  labels: I18nTransactionType;
  account?: AccountStore;
}

@inject('account')
@observer
class Receive extends React.Component<Props> {
  handleClose = () => {
    this.props.navigation.goBack();
  };
  turnToShortword = () => {
    this.props.navigation.navigate('shortword');
  };

  render() {
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#666" />
        <View style={styles.mainContent}>
          <View style={styles.qrcodeWrapper}>
            <QRCode
              value={
                this.props.account!.activeAccount!.address ||
                '0x0000351f283c318f43da159048Ded9542c20f1DFe89C'
              }
              size={200}
            />
          </View>
          <View style={styles.addressWrapper}>
            <Text>地址</Text>
            <View style={styles.addressContent}>
              <Text style={styles.address}>
                {this.props.account!.activeAccount!.address ||
                  '0x0000351f283c318f43da159048Ded9542c20f1DFe89C'}
              </Text>
              <Text style={styles.copy}>复制</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnWrapper}
            activeOpacity={0.8}
            onPress={this.turnToShortword}>
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
        </View>
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
  return <Receive labels={labels} navigation={navigation} />;
};

export default withTranslation()(Wrapped);
