import React from 'react'
import TabIcon from './TabIcon'
import I18 from 'I18n'

export const defaultTabBarOptions = ({ navigation }: any) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }
    return { tabBarVisible }
}

export const getTabNavigationOptions = ({ navigation }: any) => {
    const name = I18.t('dipperin:tabName')[navigation.state.routeName]
    return {
        tabBarIcon: ({ focused }: any) => {
            return (<TabIcon routeName={navigation.state.routeName} focused={focused} />)
        },
        tabBarLabel:name,
        tabBarOptions: {
            activeTintColor: '#14399F',
            labelStyle: {
                fontSize: 12
            },
            style: {
                height: 48,
                borderTopColor: '#E7F2DF',
            },
        },
    }
}




