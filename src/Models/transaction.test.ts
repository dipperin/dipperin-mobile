import Transaction from './transaction'
import { Utils } from '@dipperin/dipperin.js'

describe('models/transaction', () => {
  const nonce = '1'
  const value = '1'
  const from = '0xaaa'
  const to = '0x11111'
  const extraData = 'aaaa'
  const timeLock = 1
  const status = 'pending'
  const hashLock = ''
  const transactionHash = '0x111112'
  const fee = '1'
  const timestamp = 111

  const mockTx = {
    nonce,
    value,
    from,
    to,
    extraData,
    timeLock,
    status,
    hashLock,
    transactionHash,
    fee,
    timestamp
  }

  it('constructor', () => {
    const transaction = new Transaction(mockTx)
    expect(transaction.nonce).toBe(nonce)
    expect(transaction.value).toBe(Utils.fromUnit(value))
    expect(transaction.to).toBe(to)
    expect(transaction.from).toBe(from)
    expect(transaction.hashLock).toBe(hashLock)
    expect(transaction.extraData).toBe(extraData)
    expect(transaction.timeLock).toBe(timeLock)
    expect(transaction.timestamp).toBe(timestamp)
    // expect(transaction.isOverTime).toBe(true)
    expect(transaction.isEnded).toBe(false)
  })

  it('setSuccess', () => {
    const transaction = new Transaction(mockTx)
    transaction.setSuccess()
    expect(transaction.status).toBe('success')
  })

  it('setFail', () => {
    const transaction = new Transaction(mockTx)
    transaction.setFail()
    expect(transaction.status).toBe('fail')
  })

  it('signTranaction', () => {
    //
  })

  it('toJS', () => {
    const transaction = new Transaction(mockTx)
    expect(transaction.toJS()).toEqual({
      extraData,
      fee,
      from,
      hashLock,
      nonce,
      status,
      timeLock,
      timestamp,
      to,
      transactionHash,
      value
    })
  })
})
