import { randomBytes } from 'react-native-randombytes'
import { BigNumber } from 'bignumber.js'
import { typeStringToBytes, helper } from '@dipperin/dipperin.js'
import { Utils } from '@dipperin/dipperin.js'
import aesjs from 'aes-js'

/**
 * Cipher encryption
 * @param password Plaintext
 * @returns string ciphertext
 */
export const encryptionPassword = (password: string) => {
  let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 32]

  // Convert passord to bytes
  let textBytes = aesjs.utils.utf8.toBytes(password);
  // The counter is optional, and if omitted will begin at 1
  let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(6));
  let encryptionBytes = aesCtr.encrypt(textBytes);
  return aesjs.utils.hex.fromBytes(encryptionBytes)
}

/**
 * CipherText decryption
 * @param cipherPasswprd ciphertext
 * @returns string Plaintext
 */
export const decryptionPassword = (cipherPasswprd: string) => {
  let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 32]

  // convert it back to bytes
  let encryptedBytes = aesjs.utils.hex.toBytes(cipherPasswprd);
  let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(6))
  let decryptionBytes = aesCtr.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptionBytes)
}

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

export const getIsTxFromMe = (myAddress: string, fromAddress: string) => {
  return myAddress === fromAddress
}

export const isToTransferUtl = (url: string) => {
  return url.match('dp://send')
}

export const getParamsFromLinkUrl = (key: string, url: string): undefined | string => {
  try {

    const query = url.split('?')[1]
    if (!query) return
    const paramsString = query.split('&').map(item => item.split('=')).find(item => item[0] === key)
    if (paramsString && paramsString[1]) {
      return paramsString[1]
    }
  } catch (_) {
  }
}

export const createCallMethod = (funcName: string, inputsType: string[], callParams: string[]): string => {
  if (inputsType.length !== callParams.length) {
    throw new Error('The params do not match requirements.')
  }
  const params = callParams.map((param, index) => typeStringToBytes(param, inputsType[index]))
  return helper.Rlp.encode([helper.Bytes.fromString(funcName), ...params])
}

export const fromUnitToDip = (num: number) => {
  const bn = new BigNumber(num)
  return Utils.fromUnit(bn.valueOf())
}

export const verifyBalance = (amount: string, fee: string, balance: string) => {
  const bn1 = new BigNumber(amount)
  return bn1.plus(new BigNumber(fee)).isLessThanOrEqualTo(new BigNumber(balance))
}

export interface Success<T> {
  success: true;
  result: T;
}

export interface Faliure {
  success: false;
  error: Error;
}

export type Result<T> = Success<T> | Faliure;
