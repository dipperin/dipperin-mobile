import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
})
