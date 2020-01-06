import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack'

class Receive extends React.Component<NavigationStackScreenProps> {
  handleClose = () => {
    this.props.navigation.goBack()
  };

  render() {
    return (
      <View>
        <Button title={'关闭'} onPress={this.handleClose} />
        <Text>发送到</Text>
      </View>
    );
  }
}

export default Receive;
