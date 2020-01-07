

const enResouce = {
  dipperin: {
    start: {
      create: 'Create wallet',
      import: 'Import wallet'
    },
    me: {
      
    }
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

    }
  }
}

export const resource = {
  en: enResouce,
  zh: zhResource
}