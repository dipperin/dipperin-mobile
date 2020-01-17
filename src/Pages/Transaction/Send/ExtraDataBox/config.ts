import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
})
