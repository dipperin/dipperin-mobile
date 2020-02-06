import React from 'react'
import PopWrapper, { PopWrapperPropsInterface } from 'Components/PopWrapper'
import { View, StyleSheet, Text } from 'react-native'
import { I18nMeType } from 'I18n/config'

interface Props extends PopWrapperPropsInterface {
  language: I18nMeType
}

@PopWrapper
export class ResetWalletPop extends React.Component<Props> {
  render() {
    const { language } = this.props
    return (
      <View style={styles.box}>
        <Text style={styles.title}>{language.forgetPassword}</Text>
        <Text style={styles.content}>{language.forgetPasswordPopContent}</Text>
      </View>
    )
  }
}


export default ResetWalletPop


export const styles = StyleSheet.create({
  box: {
    padding: 14,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    marginBottom: 6,
    lineHeight: 24,
    textAlign: 'center',
    color: '#3C3E42',
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    textAlign: 'center',
    color: '#5F6064',
    fontSize: 13,
    lineHeight: 24,
  }
})
