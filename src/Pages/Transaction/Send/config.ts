import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fafbfc',
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
  },
  structure: {
    height: 692,
  },
  wrapper: {
    flex: Platform.OS === 'android' ? 0 : 1,
  },
  toAddressWrapper: {
    backgroundColor: '#fff',
    marginTop: 0,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: '#E3E6EB',
    borderBottomWidth: 0.5,
  },
  toAddressLabel: {
    paddingTop: 10,
    paddingBottom: 0,
    fontSize: 30,
  },
  toAddressText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5F6064',
  },
  toAddressInput: {
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    fontSize: 18,
  },
  sendAmountWrapper: {
    backgroundColor: '#fff',
    marginTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    borderBottomColor: '#E3E6EB',
    borderBottomWidth: 0.5,
  },
  sendAmountBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  sendAmountLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5F6064',
  },
  balanceText: {
    color: '#1C77BC',
    fontSize: 14,
  },
  sendAmountInput: {
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    fontSize: 18,
  },
  extraDataWrapper: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    marginTop: 10,
    paddingTop: 10,
    borderBottomColor: '#E3E6EB',
    borderBottomWidth: 0.5,
  },
  extraDataBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraDataLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5F6064',
  },
  extraDataInput: {
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    fontSize: 18,
  },
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
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
    flex: 0,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 308,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1C77BC',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    // borderRadius: 15,
  },
});
