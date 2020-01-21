import { StyleSheet } from 'react-native'

export const styles  = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 24,
    marginBottom: 50
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
    borderBottomColor: '#E8EBED',
    borderBottomWidth: 1
  },
  address: {
    flex: 1.5,
    textAlign:'center',
    color: '#393B42'
  },
  holdings: {
    flex:1.5,
    textAlign: 'center',
    color: '#393B42'
  },
  balance: {
    flex:2,
    textAlign: 'center',
    color: '#393B42'
  },
  ranking: {
    flex:1,
    textAlign: 'center',
    color: '#393B42'
  },
  textColor: {
    color:'#ffffff'
  }
})