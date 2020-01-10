import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#1C77BC',
    flex: 1,
    alignItems: 'center',
  },
  mainContent: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    width: 339,
    height: 417,
  },
  contentTitleWrapper: {
    backgroundColor: '#F1F2F3',
    justifyContent: 'center',
    width: '100%',
    height: 39,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    textAlign: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    color: '#393B42',
    fontSize: 15,
  },
  qrcodeWrapper: {
    marginTop: 20,
    // height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressWrapper: {
    marginTop: 5,
    alignItems: 'center',
  },
  addressContent: {
    borderRadius: 10,
    width: 300,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
  },
  address: {
    width: 230,
  },
  copy: {
    position: 'absolute',
    right: 0,
    top: 30,
    width: 20,
  },
  btnWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  btnSend: {
    height: 30,
    // borderRadius: 15,
  },
});
