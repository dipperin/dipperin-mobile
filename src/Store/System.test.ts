import System from './System'
import mockRootBuilder from 'tests/mocks/root' 
import { getStorage, setStorage, resetDB } from 'tests/mocks/db'
import { STORAGE_KEYS } from 'Global/constants'

describe('system store unit test', () => {
    const mockRootStore = mockRootBuilder()
    let systemStore: System
    beforeAll(() => {
        systemStore = new System(mockRootStore)
    })
    beforeEach(() => {
        getStorage.mockClear()
        setStorage.mockClear()
    })

    it('init function 1', async () => {
        getStorage.mockImplementation((name: string): any => {
            if (name === 'isEyeOpen') {
                return false
            }
            return ''
        })
        await systemStore.init()
        expect(systemStore.isEyeOpen).toBe(false)
    })

    it('init function 2', async () => {
        getStorage.mockReturnValue('test')
        await systemStore.init()
        expect(systemStore.isEyeOpen).toBe(true)
    })

    it('setLoading function', () => {
        systemStore.setLoading(true)
        expect(systemStore.loading).toBeTruthy()
    })

    it('setFingerUnlock function', () => {
        systemStore.setFingerUnLock(true)
        expect(setStorage).toBeCalledWith(STORAGE_KEYS.FINGERPRINT_UNLOCK, true)
    })

    it('setFingerPay function', () => {
        systemStore.setFingerPay(true)
        expect(setStorage).toBeCalledWith(STORAGE_KEYS.FINGERPRINT_PAY, true)
    })

    it('setCurLanguage function', () => {
        systemStore.setCurLanguage('en')
        expect(setStorage).toBeCalledWith('Language', 'en')
    })

    it('setIsEyeOpen function', () => {
        systemStore.setIsEyeOpen(true)
        expect(setStorage).toBeCalledWith('isEyeOpen', true)
    })

    it('resetWallet function', () => {
        systemStore.resetWallet()
        expect(resetDB).toBeCalledTimes(1)
    })
})


