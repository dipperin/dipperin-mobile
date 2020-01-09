import { randomBytes } from 'react-native-randombytes'


export const getNowTimestamp = (): number => {
  return new Date().valueOf()
}

export const getRandom = (count: number): Promise<Buffer> => new Promise((resolve, reject) => {
  return randomBytes(count, (err: string, bytes: Buffer) => {
    if (err) reject(err)
    else resolve(bytes)
  })
})

export const sleep = (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
