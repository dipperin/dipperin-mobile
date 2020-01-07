import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

class Fortune extends React.Component<any> {
  render() {
    const mockData=[{
      sort: 1,
      adress: '0X0000485737748892',
      name: 'test name',
      over: '56,565.235698',
      holdings: '16,234'
    },{
      sort:2,
      adress: '0X0000485737748892',
      name: 'test name',
      over: '56,565.235698',
      holdings: '16,234'
    }]
    return (
      <View style={styles.wrap}>
        <View style={{...styles.tRow, ...styles.tHeader}}>
          <Text style={styles.sort}>排序</Text>
          <Text style={styles.adress}>账户地址</Text>
          <Text style={styles.name}>合约名称</Text>
          <Text style={styles.over}>余额(DIP)</Text>
        </View>
        <FlatList 
          data={mockData}
          renderItem={({item}) => this.renderItem(item)}
        />
      </View>
    )
  }
  renderItem = (item:any) => {
    return (
      <View style={styles.tRow}>
        <Text style={styles.sort}>{item.sort}</Text>
        <Text style={styles.adress}>{`${item.adress.substr(0,6)}...${item.adress.substr(item.adress.length-2,2)}`}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.over}>{item.over}</Text>
      </View>
    )
  }
}
const styles  = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 24,
  },
  tHeader: {
    backgroundColor: '#1C77BC',
    color: '#ffffff'
  },
  tRow: {
    backgroundColor: 'rgba(231, 245, 248, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    borderRadius: 8,
    height: 44,
  },
  adress: {
    flex: 1.5,
    textAlign:'center',
    color: '#ffffff'
  },
  name: {
    flex:1,
    textAlign: 'center',
    color: '#ffffff'
  },
  over: {
    flex:2,
    textAlign: 'center',
    color: '#ffffff'
  },
  sort: {
    flex:1,
    textAlign: 'center',
    color: '#ffffff'
  }
})

export default Fortune