import * as config from './config'
import mockRootBuilder from 'tests/mocks/root'

describe('settings config unit test', () => {
    const mockRoot = mockRootBuilder(false)
    mockRoot.initWallet()
    const system = mockRoot.system
    const chainData = mockRoot.chainData
    const options = {
        extraOnChange: jest.fn(),
        onChangeItem: jest.fn()
    }
    it('settingListItemsMain function', () => {
        const res = config.settingListItemsMain(system, options)
        expect(res.length).toBe(3)
    })

    it('settingListItemsExt function', () => {
        const res = config.settingListItemsExt(system, chainData, options)
        expect(res.length).toBe(2)
    })
})
