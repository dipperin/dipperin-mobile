import ChainData from './chainData'
import { NET, NET_HOST } from 'Global/constants'
import * as Db from 'Db'

import mockRootBuilder from 'tests/mocks/root'

describe('ChainData Store', () => {
    const rootStore = mockRootBuilder()
    const chainData = new ChainData(rootStore)
    it('constructor', () => {
        const { currentNet, currentNetHost, blockInfo, isConnect } = chainData
        expect(currentNet).toBe(NET.VENUS)
        expect(currentNetHost).toBe(NET_HOST[currentNet])
        expect(blockInfo).toBe(undefined)
        expect(isConnect).toBe(false)
    })

    it('init', async () => {
        jest.spyOn(Db, 'getStorage').mockImplementation(async () => NET.TEST )
        await chainData.init()
        expect(chainData.currentNet).toBe(NET.TEST)
    })

    it('startUpDate', async () => {
        const mockBlockInfo = {
            header: {
              nonce: '2',
              number: '1',
              timestamp: '1548063597639',
            },
            body: {
              transactions: [],
            },
          }
        rootStore.dipperin!.dr.getCurrentBlock = jest.fn(async () => mockBlockInfo)
        rootStore.dipperin!.net.isConnecting = jest.fn(async () => true)
        await chainData.startUpdate()
        expect(chainData.blockInfo.transactions).toBe(0)
        expect(chainData.isConnect).toBe(true)
    })

    it('startUpdate, can not connet', async () => {
        rootStore.dipperin!.dr.getCurrentBlock = jest.fn(async () => undefined)
        rootStore.dipperin!.net.isConnecting = jest.fn(async () => false)
        await chainData.startUpdate()
        expect(chainData.blockInfo).toBe(undefined)
        expect(chainData.isConnect).toBe(false)
    })

    it('changeNet', () => {
        chainData.changeNet(NET.VENUS)
        expect(chainData.currentNet).toBe(NET.VENUS)
        expect(chainData.isConnect).toBe(false)
    })

    it('resetBlockInfo', () => {
        chainData.resetBlockInfo()
        expect(chainData.blockInfo).toBe(undefined)
    })

})