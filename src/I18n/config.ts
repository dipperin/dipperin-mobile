

const enResouce = {
  dipperin: {
    start: {
      create: 'Create wallet',
      import: 'Import wallet'
    },
    me: {
      
    },
    discovery: {
      title: 'discovery',
      tab1: 'Hot DApp',
      tab2: 'Smart Contracts',
      tab3: 'Rich List',
      contracts: {
        contractsAdress: 'Contracts Adress',
        contractsName: 'Contracts name',
        over: 'over(DIP)',
        transactionsNumber: 'Transaction number'
      },
      apps: {
        users: 'users',
        transactionsNumber: 'transactions number',
        transactionsValue: 'Transaction value',
        over: 'over(DIP)',
      },
      fortune: {
        sort: 'sort',
        holdings: 'holdings',
        account: 'account address',
        over: 'over(DIP)',
      }
    },
  }

}

export type I18StartType = typeof enResouce.dipperin.start

const zhResource: typeof enResouce = {
  dipperin: {
    start: {
      create: '创建钱包',
      import: '导入钱包'
    },
    me: {

    },
    discovery: {
      title: '发现',
      tab1: '热门应用',
      tab2: '合约排行',
      tab3: '富豪榜',
      contracts: {
        contractsAdress: '合约地址',
        contractsName: '合约名称',
        over: '余额(DIP)',
        transactionsNumber: '交易额'
      },
      apps: {
        users: '用户',
        transactionsNumber: '交易',
        transactionsValue: 'Transaction value',
        over: '余额(DIP)',
      },
      fortune: {
        sort: '排序',
        holdings: '持有量',
        account: '账户地址',
        over: '余额(DIP)',
      }
    },
  }
}

export const resource = {
  en: enResouce,
  zh: zhResource
}