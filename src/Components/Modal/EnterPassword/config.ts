import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  passwordInput: {
    width: 279,
    height: 38,
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FAFBFC',
  },
  btnBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    width: 132,
    height: 38,
    borderRadius: 5,
    backgroundColor: '#DEE0E3',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 0,
  },
  confirmBtn: {
    width: 132,
    height: 38,
    borderRadius: 5,
    backgroundColor: '#1C77BC',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 0,
  },
  wrapper: {
    flex: Platform.OS === 'android' ? 0 : 1,
  },
  passwordHintWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  passwordHint: {
    color: '#B7BBBE',
    fontSize: 10,
  },
  passwordHintContent: {
    color: '#4F6A7F',
    fontSize: 10,
  },
});
