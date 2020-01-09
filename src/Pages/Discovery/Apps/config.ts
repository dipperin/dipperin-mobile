import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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