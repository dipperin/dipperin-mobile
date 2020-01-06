import React from 'react'
import { View, Text, Button } from 'react-native'
import { storage } from "Db"

class Accounts extends React.Component<any> {

  componentDidMount() {
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
  turnToSend = () => {
    this.props.navigation.navigate('send')
  }
  turnToReceive = () => {
    this.props.navigation.navigate('receive')
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
        <Button
          title={"send"}
          onPress={this.turnToSend}
          />
        <Button
          title={"receive"}
          onPress={this.turnToReceive}
          />
      </View>
    )
  }
}

export default Accounts