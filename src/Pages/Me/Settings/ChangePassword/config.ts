import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc'
  },

  content: {
    flex: 1,
    marginTop: 20,
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
    height: 58,
    backgroundColor: '#fff',
    borderColor: '#EFF2F4',
    borderBottomWidth: 1
  },
  inputItemBorderTopAndBottom: {
    borderTopWidth: 1,
  },
  inputItemLabel: {
    marginRight: 10,
    flexWrap: 'nowrap',
    fontSize: 17,
    color: '#393B42'
  },
  input: {
    flex: 1,
    fontSize: 17,
    textAlign: 'right'
  },

  psdHint: {
    marginTop: 10,
    marginBottom: 24,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 12,
    color: '#B7BBBE'
  },

  btnBox: {
    alignItems: 'center'
  },
  btnTounch: {
    minWidth: 308,
    maxWidth: 400,
    height: 44,
    justifyContent: 'center',
    backgroundColor: '#1C77BC',
    borderRadius: 20,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15
  },

  forgetPassword: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 34,
    
  },
  forgetPasswordText: {
    fontSize: 13,
    color: '#767F86',
  }
})
