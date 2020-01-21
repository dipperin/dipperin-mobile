import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#fafbfc',
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
  },
  structure: {
    height: 692,
  },
  wrapper: {
    flex: Platform.OS === 'android' ? 0 : 1,
  },
})

export const validateEnteringAddress = (addr: string) => {
  return /^(0x)?(0000|0014)[0-9a-fA-F]{0,40}$/.test(addr)
}

export const validateEnteringShortword = (word: string) => {
  const reg = new RegExp('^[\u4e00-\u9fa5A-Za-z0-9]{0,20}$')
  if (!reg.test(word)) {
    return false
  }
  return true
}

export const validateEnteringArressOrShortword = (text: string) => {
  return validateEnteringAddress(text) || validateEnteringShortword(text)
}

export const validateEnteringAmount = (amountString: string) => {
  const reg = new RegExp('^[0-9]*([.][0-9]{0,18})?$')
  return reg.test(amountString)
}

export const validateExtraData = (text: string) => {
  if (text.length > 200) {
    return false
  }
  // --- add new rule here
  return true
}
