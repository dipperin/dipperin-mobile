import { StyleSheet } from "react-native"

export interface MeItemProps {
  iconName: string
  title: string
  routeName: string
}

export type MeListItemsProps = MeItemProps[]

export const MeListItems: MeListItemsProps = [
  {
    iconName: 'icon|shezhi',
    title: '设置',
    routeName: 'settings',
  },
  {
    iconName: 'icon|guanyuwomen',
    title: '关于我们',
    routeName: 'aboutUs',
  },
  {
    iconName: 'icon|shezhi',
    title: 'FAQ',
    routeName: 'helpCenter',
  }
]

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "#fafbfc"
  },
  title: {
    textAlign: 'center',
    marginBottom: 14,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e5e6',
    borderBottomWidth: 1,
    fontSize: 20,
    color: '#6A7575',
    fontWeight: "bold",
    lineHeight: 44
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
  },
  firstItem: {
    marginBottom: 14
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: "#515151",
    lineHeight: 24
  }
})
