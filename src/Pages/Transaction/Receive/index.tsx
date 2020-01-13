import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import QRCode from 'react-native-qrcode-svg';
import {withTranslation, WithTranslation} from 'react-i18next';
import {I18nTransactionType} from 'I18n/config';
import {Icon} from 'Components/Icon';

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

  copyToClickboard = () => {
    Clipboard.setString(this.props.account!.activeAccount!.address);
  };

  render() {
    const {labels} = this.props;
    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor="#1C77BC" barStyle="light-content" />
        <View style={styles.mainContent}>
          <View style={styles.contentTitleWrapper}>
            <Text style={styles.contentTitle}>{labels.qrCode}</Text>
          </View>

          <View style={styles.addressWrapper}>
            <View style={styles.addressContent}>
              <Text style={styles.address}>
                {this.props.account!.activeAccount!.address ||
                  '0x0000351f283c318f43da159048Ded9542c20f1DFe89C'}
              </Text>
              <TouchableOpacity
                style={styles.copy}
                onPress={this.copyToClickboard}>
                <Icon name={'fontAwesome|copy'} size={20} color={'#67686E'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.qrcodeWrapper}>
            <QRCode
              value={
                this.props.account!.activeAccount!.address ||
                '0x0000351f283c318f43da159048Ded9542c20f1DFe89C'
              }
              size={200}
            />
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
              width: 308,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#4992c9',
            }}>
            <Text style={{color: '#fff', fontSize: 17}}>
              {labels.shortWordReceive}
            </Text>
          </View>
        </TouchableOpacity>
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
