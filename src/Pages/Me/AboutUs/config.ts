import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  box: {
    flex: 1,
  },

  topWrap: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  logo: {
    width: 32,
    height: 38
  },
  appMsg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 20,
    color: '#666',
  },
  appVersion: {
    fontSize: 14,
    color: '#999'
  },

  listWrap: {
    
  },

  listItem: {
    lineHeight: 58,
    fontSize: 14, 
    color: '#515151'
  },
  updateVersion: {
    color: '#cc0000'
  }
})
