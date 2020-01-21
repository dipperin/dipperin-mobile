export const getWallet = async () => ({
  activeAccountId: '1',
  encryptSeed: {
    cipher:
      'a41c6b1ae9bad0e7caa194ae7a0dcc4a706315236442b66ffd7bf31f67a9679459f1ab32b44414587678c09cc7d9860938230627bc7952be85b3558dd1fb255e670fe473a231f484167a4e490d9d1716b041282dc85bd2b72a1c939236e72e8d25d5378f3370f88dfd78555fef310203c8946dfebe02fc40a97f314dbafdb110aa89488f',
    iv: '1989e445c06db6dd28c5e73503baa923',
  },
  lockTime: '',
  unlockErrTimes: 0,
  walletId: 1579501201165,
})
export const getAccount = async () => []
const storage = {
  Language: 'zh',
}
export const getStorage = jest.fn((key: string) => storage[key])
export const setStorage = jest.fn()
export const updateSingleAccount = jest.fn()
export const insertAccount = jest.fn()
export const removeAccount = jest.fn()
export const getContractTx = async () => []
export const getTx = async () => []
export const insertTx = jest.fn()
export const updateTx = jest.fn()
export const insertWallet = jest.fn()
export const getActiveId = async () => '1'
export const getErrTimes = async () => 0
export const getLockTime = async () => ''
export const updateLockTime = jest.fn()
export const updateActiveId = jest.fn()
export const updateErrTimes = jest.fn()
export const resetDB = jest.fn()
