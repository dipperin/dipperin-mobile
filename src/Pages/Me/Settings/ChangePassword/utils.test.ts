import * as utils from './utils'
import { mockI18n } from 'tests/mocks/i18n'
describe('utils', () => {
    it('passwordCheck function', () => {
        const mockMe = mockI18n.dipperin.me
        const oldpasswordEmpty = utils.passwordCheck('', 'test', 'test', mockMe)
        expect(oldpasswordEmpty).toBe(mockMe.pleaseFill + mockMe.oldPassword)

        const newpasswordEmpty = utils.passwordCheck('test', '', '', mockMe)
        expect(newpasswordEmpty).toBe(mockMe.pleaseFill + mockMe.newPassword)

        const confrimpasswordEmpty = utils.passwordCheck('test', 'test', '', mockMe)
        expect(confrimpasswordEmpty).toBe(mockMe.pleaseFill + mockMe.confrimPassword)

        const passwordCheckRes = utils.passwordCheck('test', 'test', 'test', mockMe)
        expect(passwordCheckRes).toBe(mockMe.psdLimit)

        const passwordCheckRes2 = utils.passwordCheck('test1234', 'test345512test345512wewes', 'test345512test345512wewes', mockMe)
        expect(passwordCheckRes2).toBe(mockMe.psdLimit)

        const diffPassword = utils.passwordCheck('test1234', 'rests3233', 'faewgawege', mockMe)
        expect(diffPassword).toBe(mockMe.diffPassword)

        const checkSuccess = utils.passwordCheck('test1234', 'test1231', 'test1231', mockMe)
        expect(checkSuccess).toBe('')
    })
})

