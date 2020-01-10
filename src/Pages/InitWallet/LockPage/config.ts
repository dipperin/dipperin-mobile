import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  box: {
    flex: 1
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fingerprintImg: {
    marginBottom: 10,
    width: 73,
    height: 80,
    resizeMode: 'contain'
  },
  fingerHint: {
    padding: 4,
    color: '#1C77BC',
    fontSize: 15,
  },


  btn: {
    alignSelf: 'center',
    margin: 20,
    padding: 4
  },
  btnText: {
    color: '#4F6A7F',
    fontSize: 15,
  }
})