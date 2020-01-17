import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  txFeeWrapper: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderBottomColor: '#E3E6EB',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  txFeeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  txFeeLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5F6064',
  },
  txFeeText: {
    color: '#CB0000',
    fontSize: 12,
  },
  txFeeBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 10,
  },
  defalutFeeLevel: {
    color: '#C6C6C6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeFeeLevel: {
    color: '#1C77BC',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
