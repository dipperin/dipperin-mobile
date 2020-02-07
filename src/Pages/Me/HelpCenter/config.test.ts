import * as config from './config'
import { mockI18n } from 'tests/mocks/i18n'

const mockI18nMe = mockI18n.dipperin.me

test('dataSource function', () => {
    let res = config.dataSource(mockI18nMe)
    expect(res.length).toBe(6)
})

