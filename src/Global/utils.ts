import { randomBytes } from 'react-native-randombytes'
import { BigNumber } from 'bignumber.js'


export const getNowTimestamp = (): number => {
  return new Date().valueOf()
}

export const getRandom = (count: number): Promise<Buffer> => new Promise((resolve, reject) => {
  return randomBytes(count, (err: string, bytes: Buffer) => {
    if (err) reject(err)
    else resolve(bytes)
  })
})

export const balancePercent = (balance: string | number, height: number): string => {  
  return new BigNumber(balance)
  .div(2 * height + 52560000)
  .times(100)
  .toString(10)
  .substr(0, 10)
}
export const sleep = (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const formatNumber = (num: number, w: number) => {
  const m = 10 ** w
  const b = Math.floor(num * m) / m
  return b.toLocaleString('zh-Hans', {
    maximumFractionDigits: w
  })
}


export const isToTransferUtl = (url:string) =>  {
  return url.match('dp://send')
}

export const getParamsFromLinkUrl = (key:string, url: string): undefined | string => {
  try {

      const query = url.split('?')[1]
      if(!query) return
      const paramsString = query.split('&').map(item => item.split('=')).find(item => item[0]===key)
      if(paramsString && paramsString[1]) {
          return paramsString[1]
      }
  }catch(_) {
  }

}
