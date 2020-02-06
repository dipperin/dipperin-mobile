import { StyleSheet } from 'react-native'
import { I18nMeType } from 'I18n/config'

export interface MeItemProps {
  iconName: string
  iconColor: string
  title: string
  routeName: string
}

export type MeListItemsProps = MeItemProps[]

export const MeListItems = (labels: I18nMeType): MeListItemsProps => [
  {
    iconName: 'icon|shezhi1',
    iconColor: '#1C77BC',
    title: labels.setting,
    routeName: 'settings',
  },
  {
    iconName: 'icon|guanyuwomen',
    iconColor: '#399AB6',
    title: labels.aboutUs,
    routeName: 'aboutUs',
  },
  {
    iconName: 'icon|faq',
    iconColor: '#E36918',
    title: labels.FAQ,
    routeName: 'helpCenter',
  },
]

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fafbfc',
  },
  title: {
    textAlign: 'center',
    marginBottom: 14,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e5e6',
    borderBottomWidth: 1,
    fontSize: 20,
    color: '#6A7575',
    fontWeight: 'bold',
    lineHeight: 44,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
  },
  firstItem: {
    marginBottom: 14,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: '#515151',
    lineHeight: 24,
  },
})
