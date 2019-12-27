import React from 'react'
import TabIcon from './TabIcon'
// import { commonHeaderStyle } from "./config"



export const getTabNavigationOptions = ({ navigation }: any) => {
    return {
        // ...commonHeaderStyle,
        tabBarIcon: ({ focused }: any) => {
            return (<TabIcon routeName={navigation.state.routeName} focused={focused} />)
        },
        tabBarOptions: {
            activeTintColor: '#14399F',
            style: {
                height: 48,
                borderTopColor: '#E7F2DF'
            },
        },
    }
}




