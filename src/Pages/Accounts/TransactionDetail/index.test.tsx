import React from 'react'
import { View } from 'react-native'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockNavigation } from 'tests/mocks/navigation'
import { mockI18n } from 'tests/mocks/i18n'
import moment from 'moment'
import { formatUTCTime } from 'Global/utils'
import { TransactionDetail } from './index'

describe('TransactionDetail', () => {
    let props = {
        labels: mockI18n.dipperin.account,
        navigation: mockNavigation,
    }
    let component: ShallowWrapper
    let instance: TransactionDetail
    beforeEach(() => {
        component = shallow(<TransactionDetail {...props} />)
        instance = component.instance() as TransactionDetail
    })
    it('render', () => {
        expect(component.find(View).length).toBe(9)
    })
    it('getShowTime',()=>{
        const res1 = instance.getShowTime(66666666668888888888)
        expect(res1).toBe(formatUTCTime(66666666668888888888 + ''))

        const res2 = instance.getShowTime(666666666688)
        expect(res2).toBe(moment(666666666688).format('YYYY/MM/DD HH:MM:SS A+UTC'))
    })

})

