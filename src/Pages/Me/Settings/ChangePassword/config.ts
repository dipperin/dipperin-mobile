import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc'
  },

  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 14,
    height: 44,
    borderBottomColor: '#e5e5e6',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  },
  cancelText: {
    color: '#AEAEAE',
    fontSize: 15,
  },
  title: {
    color: '#6A7575',
    fontSize: 18,
    fontWeight: '700'
  },
  savePassword: {
    color: '#AEAEAE',
    fontSize: 15
  },

  content: {
    marginTop: 20,
    backgroundColor: '#fff'
  },
  inputItem: {
    lineHeight: 60,
  }
})