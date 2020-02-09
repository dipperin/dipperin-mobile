import DiscoveryStore from './discovery'
import mockRootBuilder from 'tests/mocks/root'

describe('stores/discovery', () => {
    const root = mockRootBuilder(true)
    let discovery: DiscoveryStore = new DiscoveryStore()

    it('constructor', () => {
        expect(() => {
            discovery = new DiscoveryStore()
        }).not.toThrow()
    })

    it('updateAppsList', () => {
      const res = {
        success: true,
        app: [],
        data: {
          app_data: [],
          total_count: 0,
          total_pages: 1
        }
      }

      discovery.updateAppsList(res)
      expect(discovery.appsList.length).toBe(0)
    })
    it('updateFortuneList', () => {
      const params = {
        total_count: 1,
        account_list: [{
          sort: 1,
          address: 'string',
          name: 'string',
          dip_balance: 10,
          balance: 10
        }]
      }
      discovery.updateFortuneList(params)
      expect(discovery.fortuneListTotalCount).toBe(1)
    })
    it('updateBlockHeight', () => {
      const data = 10
      discovery.updateBlockHeight(data)
      expect(discovery.totalBlocks).toBe(10)
    })
    it('updateContractsList', () => {
      const res = {
        success: true,
        data: {
          contract_data: [{
            address: 'string',
            contract_name: 'string',
            dip_balance: '11111',
            tx_count: 10,
            token_money_total: 'ssss'
          }],
          total_count: 1,
          total_pages: 1
        },
        info: 'string'
      }
      discovery.updateContractsList(res)
      expect(discovery.contractsList.length).toBe(1)
    })
    it('getAppsList', async () => {
      const params = {
        page: 1,
        per_page: 10,
        as_and_desc: 'desc'
      }
     await discovery.getAppsList(params)
      expect(discovery.appsListCurPage).toBe(1)
    })
    it('getContractList', async () => {
      const params = {
        page: 1,
        per_page: 10,
        asc_and_desc: 'desc',
        order_by: 'string'
      }
      await discovery.getContractList(params)
      expect(discovery.contractsListCurPage).toBe(1)
    })
    it('getFortuneList',async () => {
      const params = {
        page: 1,
        per_page: 10,
        asc_and_desc: 'desc',
        order_by: 'string'
      }
      await discovery.getFortuneList(params)
      expect(discovery.fortuneListCurPage).toBe(1)
    })
    it('getBlockHeight', async () => {
      const updateBlockHeight = jest.spyOn(discovery, 'updateBlockHeight')
      await discovery.getBlockHeight()
      expect(updateBlockHeight).toBeCalled()
    })
})
