import { StyleSheet, Dimensions } from "react-native";
const client = Dimensions.get('window')

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'space-between'
  },

  topWrap: {
    marginTop: client.height * 0.16,
    alignItems: 'center',
  },
  logoWrap: {
    borderRadius: 8,
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain'
  },
  appMsg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    marginTop: 35,
    marginBottom: 12,
    fontSize: 24,
    color: '#393B42',
  },
  appVersion: {
    fontSize: 15,
    color: '#393B42'
  },

  userProtocolTouch: {
    alignSelf: 'center',
    marginBottom: 24,
    padding: 6
  },
  userProtocolText: {
    fontSize: 13,
    color: '#4F6A7F'
  }
})
