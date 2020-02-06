/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text } from 'react-native'
import { ListItemProps } from '@ant-design/react-native/lib/list/ListItem';
import { I18nMeType } from 'I18n/config';

export interface ListItemPropsType extends ListItemProps {
  id: string
  title: string
  detail: React.ReactNode
}


export const dataSource = (label: I18nMeType) => [
  {
    id: '1',
    title: label.FAQForgetPassowrdTitle,
    detail: (
      <>
        <Text style={styles.faqDetailSubParagraph}>{label.FAQForgetPassowrdDesc1}</Text>
        <Text style={styles.faqDetailSubtitle}>{label.FAQForgetPassowrdDesc2}</Text>
        <Text>{label.FAQForgetPassowrdDesc3}</Text>
      </>
    ),
  },
  {
    id: '2',
    title: label.FAQToggleNodeTitle,
    detail: (
      <>
        <Text style={styles.faqDetailSubParagraph}>{label.FAQToggleNodeDesc1}</Text>
        <Text style={styles.faqDetailSubtitle}>{label.FAQToggleNodeDesc2}</Text>
        <Text>{label.FAQForgetPassowrdDesc3}</Text>
      </>
    ),
  },
  {
    id: '3',
    title: label.FAQMnemonicWordTitle,
    detail: (
      <>
        <Text style={styles.faqDetailSubParagraph}>{label.FAQMnemonicWordDesc1}</Text>
        <Text style={styles.faqDetailSubtitle}>{label.FAQMnemonicWordDesc2}</Text>
        <Text style={styles.faqDetailDot}>{label.FAQMnemonicWordDesc3}</Text>
        <Text style={styles.faqDetailSubtitle}>{label.FAQMnemonicWordDesc4}</Text>
        <Text style={styles.faqDetailDot}>{label.FAQMnemonicWordDesc5}</Text>
      </>
    ),
  },
  {
    id: '4',
    title: label.FAQWalletLossTitle,
    detail: (
      <>
        <Text style={styles.faqDetailSubParagraph}>{label.FAQWalletLossDesc1}</Text>
        <Text style={styles.faqDetailDot}>{label.FAQWalletLossDesc2}</Text>
      </>
    ),
  },
  {
    id: '5',
    title: label.FAQTransferAccountsFailTitle,
    detail: (
      <>
        <Text style={styles.faqDetailDotTitle}>{label.FAQTransferAccountsFailDesc1}</Text>
        <Text style={styles.faqDetailDot}>{label.FAQTransferAccountsFailDesc2}</Text>
        <Text style={styles.faqDetailDotTitle}>{label.FAQTransferAccountsFailDesc3}</Text>
        <Text style={styles.faqDetailDot}>{label.FAQTransferAccountsFailDesc4}</Text>
        <Text style={[styles.faqDetailDotTitle, { marginBottom: 0 }]}>{label.FAQTransferAccountsFailDesc5}</Text>
        <Text>{label.FAQTransferAccountsFailDesc6}</Text>
      </>
    ),
  },
  {
    id: '6',
    title: label.FAQNotArriveAccountTitle,
    detail: (<Text>{label.FAQNotArriveAccountDesc1}</Text>),
  },
]


export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc',
  },

  subTitle: {
    paddingLeft: 14,
    paddingRight: 14,
    lineHeight: 40,
    fontSize: 12,
    color: '#333',
    backgroundColor: '#fafbfc',
  },

  itemText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 58,
  },

  faqDetailSubtitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  faqDetailSubParagraph: {
    lineHeight: 24,
    fontSize: 15,
  },
  faqDetailDotTitle: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  faqDetailDot: {
    lineHeight: 22,
  },

})
