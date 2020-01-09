import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#666',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    margin: 30,
    backgroundColor: '#ffff',
    borderRadius: 20,
    alignItems: 'center',
  },
  qrcodeWrapper: {
    marginTop: 30,
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  addressContent: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: 300,
    flexDirection: 'row',
    padding: 20,
  },
  address: {
    width: 230,
  },
  copy: {
    width: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
    height: 50,
    borderRadius: 25,
    width: 200,
  },
  btnSend: {
    height: 30,
    // borderRadius: 15,
  },
});
