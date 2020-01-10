import React from 'react';
import {observer} from 'mobx-react';
import {ScrollView, Text, View, TextInput} from 'react-native';
import {
  Button,
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Provider,
} from '@ant-design/react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTranslation, WithTranslation} from 'react-i18next';
import {I18nTransactionType} from 'I18n/config';
import {styles} from './config';
import {action, observable} from 'mobx';
import {getStatusBarHeight} from 'react-native-safe-area-view';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
  labels: I18nTransactionType;
}

@observer
class EnterPassword extends React.Component<Props> {
  @observable password: string = '';

  @action private setPassword = (text: string) => {
    this.password = text;
  };

  handleChangePassword = (text: string) => {
    this.setPassword(text);
  };

  handleConfirm = async () => {
    try {
      await this.props.onConfirm(this.password);
      this.setPassword('');
    } catch (e) {
      // do nothing
      this.setPassword('');
    }
  };

  render() {
    const {labels} = this.props;
    return (
      <Provider>
        {/* <KeyboardAwareScrollView
          contentContainerStyle={styles.wrapper}
          // style={styles.contentWrapper}
          resetScrollToCoords={{x: 0, y: 0}}> */}
        <Modal
          title={labels.enterPassword}
          transparent
          onClose={this.props.onClose}
          maskClosable
          visible={this.props.visible}
          style={{height: 0}}>
          <View style={{paddingVertical: 20, width: 308}}>
            <TextInput
              style={styles.passwordInput}
              value={this.password}
              onChangeText={this.handleChangePassword}
              placeholder={labels.enterPassword}
              secureTextEntry={true}
            />
            <View style={styles.passwordHintWrapper}>
              <Text style={styles.passwordHint}>{labels.passwordHit} </Text>
              <Text style={styles.passwordHintContent}>123</Text>
            </View>
            {/* <Text style={{textAlign: 'center'}}>Content...</Text>
            <Text style={{textAlign: 'center'}}>Content...</Text> */}
          </View>
          <View style={styles.btnBox}>
            <Button
              style={styles.cancelBtn}
              type={'primary'}
              onPress={this.props.onClose}>
              {labels.cancel}
            </Button>
            <Button
              style={styles.confirmBtn}
              type={'primary'}
              onPress={this.handleConfirm}>
              {labels.confirm}
            </Button>
          </View>
        </Modal>
        {/* </KeyboardAwareScrollView> */}
      </Provider>
    );
  }
}

const Wrapped = (
  props: WithTranslation & {
    visible: boolean;
    onClose: () => void;
    onConfirm: (password: string) => Promise<void>;
  },
) => {
  const {t, visible, onClose, onConfirm} = props;
  const labels = t('dipperin:transaction') as I18nTransactionType;
  return (
    <EnterPassword
      labels={labels}
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default withTranslation()(Wrapped);

// export default EnterPassword;
