import React from 'react'
import { View, Text, Button, StatusBar } from 'react-native'
import { storage } from "Db"

class Accounts extends React.Component<any> {
  _navListener: any
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('#ffffff');
    });
    storage.save({
      key: "accountTable",
      id: 'dd',
      data: {
        name: "string",
        address: "string",
        id: 22,
        nonce: "string",
        path: "string",
      }
    })
  }
  componentWillUnmount() {
    this._navListener.remove();
  }
  save = () => {
    storage.save({
      key: "accountTable",
      id: 'dd',
      data: {
        name: "123",
        address: "456",
        id: 22,
        nonce: "str996ing",
        path: "852741",
      }
    })
  }
  get=async()=>{
    const res = await storage.getAllDataForKey("accountTable")
    console.log(res)
  }
  render() {
    return (
      <View>
        <Text>Accounts</Text>
        <Button
          title={"save"}
          onPress={this.save}
        />
        <Button
          title={"get"}
          onPress={this.get}
        />
      </View>
    )
  }
}

export default Accounts