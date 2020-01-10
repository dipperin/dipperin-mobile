import { StyleSheet } from 'react-native'
export const formatEllipsis = (str: string) => {
  return `${str.substr(0,6)}...${str.substr(str.length-2,2)}`
}

export const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#0B0E19',
    paddingVertical: 9,
    height: '100%'
  },
  flexBlock: {
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  item: {
    minWidth: 94,
    textAlign:'center', 
    fontSize: 15,
    color: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderColor: '#1C77BC',
    borderWidth: 1
  },
  item0: {
    borderTopLeftRadius: 38,
    borderBottomLeftRadius: 38
  },
  item1: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  item2: {
    borderTopRightRadius: 38,
    borderBottomRightRadius: 38
  },
  activeItem: {
    backgroundColor: '#1C77BC'
  }
})