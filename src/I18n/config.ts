

const enResouce = {
  dipperin: {
    start: {
      start: 'start'
    },
    me: {
      
    }
  }

}

export type I18StartType = typeof enResouce.dipperin.start

const zhResource: typeof enResouce = {
  dipperin: {
    start: {
      start: '初始页'
    },
    me: {

    }
  }
}

export const resource = {
  en: enResouce,
  zh: zhResource
}