import React from 'react';
import {observer} from 'mobx-react';
import {ScrollView, Text, View} from 'react-native';
import {
  Button,
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Provider,
} from '@ant-design/react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

@observer
class EnterPassword extends React.Component<Props> {
  render() {
    return (
      <Provider>
        <Modal
          title="Title"
          transparent
          onClose={this.props.onClose}
          maskClosable
          visible={this.props.visible}
          >
          <View style={{paddingVertical: 20}}>
            <Text style={{textAlign: 'center'}}>Content...</Text>
            <Text style={{textAlign: 'center'}}>Content...</Text>
          </View>
          <Button type="primary" onPress={this.props.onClose}>
            close modal
          </Button>
        </Modal>
      </Provider>
    );
  }
}

export default EnterPassword;
