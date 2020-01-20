import i18n from 'I18n/index'
import { I18nErrorType } from 'I18n/config'

export class InvalidWalletError extends Error {
  public name = 'InvalidWalletError'

  constructor() {
    super()
    Object.setPrototypeOf(this, InvalidWalletError.prototype)
    this.message = 'The wallet is invalid!'
  }
}

export class NoEnoughBalanceError extends Error {
  public name = 'NoEnoughBalance'

  constructor() {
    super()
    Object.setPrototypeOf(this, NoEnoughBalanceError.prototype)
    this.message = 'insufficient balance'
  }
}

export enum TxResponseCode {
  unknownError,
  addressReimportError,
}

export const TxResponseInfo = {
  [TxResponseCode.unknownError]: 'Something wrong!',
  [TxResponseCode.addressReimportError]:
    'The address has already existed in wallet!',
}

export type stdResponse = [boolean, any]

export const stdResponse2throwLike = async (
  fn: (...args: any[]) => stdResponse,
) => {
  const result = await fn()
  if (result[0]) {
    throw new Error(String(result[1]))
  }
}

interface TxResponse {
  success: boolean
  info?: string
  hash?: string
}

export const generateTxResponse = (
  ifsuccess: boolean,
  info?: { message: string } | string | undefined,
): TxResponse => {
  if (ifsuccess) {
    return { success: true, info: info as string }
  }
  if (info) {
    let errInfo: string
    if (typeof info === 'string') {
      errInfo = info
    } else if (typeof info.message === 'string') {
      errInfo = info.message
    } else {
      errInfo = String(info)
    }
    // const errInfo = typeof(info) === "string" ? info : info.message
    return { success: false, info: errInfo }
  }
  return { success: false, info: TxResponseInfo[TxResponseCode.unknownError] }
}

export const handleError = (errorMsg: string): string => {
  const labels = i18n.t('dipperin:errors') as I18nErrorType
  if (errorMsg.includes('new fee is too low to replace the old one')) {
    return labels.toLowFee
  }
  if (errorMsg.includes('this transaction already in tx pool')) {
    return labels.alreadyInPool
  }
  if (errorMsg.includes('tx nonce is invalid')) {
    return labels.invalidNonce
  }
  return labels.sendFailure
}

export default {
  InvalidWalletError,
  NoEnoughBalanceError,
}
