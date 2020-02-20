import React from 'react'
import PopWrapper, { PopWrapperPropsInterface } from 'Components/PopWrapper'
import { View, StyleSheet, Text } from 'react-native'
import { I18nGameType } from 'I18n/config'

interface Props extends PopWrapperPropsInterface {
  language: I18nGameType
  accountName:string
  dappName:string
}

@PopWrapper
export class AuthorityPop extends React.Component<Props> {
  render() {
    const { language ,accountName,dappName} = this.props
    return (
      <View style={styles.box}>
        <Text style={styles.title}>{language.authorityTitle}</Text>
        <Text style={styles.content}>{`${accountName} ${language.authorityContent} ${dappName} `}</Text>
      </View>
    )
  }
}


export default AuthorityPop


export const styles = StyleSheet.create({
  box: {
    padding: 14,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    marginBottom: 6,
    lineHeight: 24,
    textAlign: 'center',
    color: '#3C3E42',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'center',
    color: '#5F6064',
    fontSize: 13,
    lineHeight: 24,
  },
})
