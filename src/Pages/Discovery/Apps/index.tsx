import React from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'

class Apps extends React.Component<any> {

  render() {
    return (
      <View style={styles.wrap}>
        <FlatList 
          data={[{name: 'Rich Bet', type: '竞猜'}]}
          renderItem={({item}) => this.renderItem(item)}
          ListFooterComponent={() => <View style={styles.more}><Text>更多DApp敬请期待</Text></View>}
        />
     </View>
    )
  }
  renderItem = (item:any) => {
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <Image source={{uri:'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg'}} style={styles.iamge} />
        </View>
        <View style={styles.right}>
          <View style={styles.intro}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <View style={styles.data}>
            <View style={styles.info}>
              <Text style={styles.grayLabel}>用户:</Text>
              <Text style={styles.blueText}>1092</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.grayLabel}>交易数:</Text>
              <Text style={styles.blueText}>1239</Text>
            </View>
          </View>
          <View style={styles.flex}>
              <Text style={styles.grayLabel}>交易额:</Text>
              <Text style={styles.blueText}>9,864,556.23 DIP</Text>
            </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap:{
    padding: 24
  },
  flex: {
    flexDirection: 'row'
  },
  item: {
    width: '100%',
    height: 87,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 245, 248, 0.1)',
    padding: 11,
    borderRadius: 8,
    marginBottom: 9
  },
  left:{
    width:118,
    height:65,
    marginRight: 15,
  },
  iamge: {
    width: '100%',
    height: '100%',
  },
  right: {
   flex:1
  },
  intro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 3,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 14
  },
  type: {
    color: '#BCC2C9',
    fontSize: 10,
  },
  data: {
    width: '100%',
    flexDirection: 'row'
  },
  info: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  blueText: {
    color: '#1C77BC',
    fontSize: 10.5
  },
  grayLabel: {
    color:'#767F86',
    marginRight: 4,
    fontSize: 10.5
  },
  more: {
    paddingTop: 30,
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default Apps