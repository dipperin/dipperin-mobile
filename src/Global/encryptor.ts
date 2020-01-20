import { NativeModules } from 'react-native'
const Aes = NativeModules.Aes

const salt = 'salt'
const cost = 5000
const length = 256

export interface EncryptedData {
  cipher: string
  iv: string
}

const generateKey = (
  password: string,
  salt: string,
  cost: number,
  length: number,
) => Aes.pbkdf2(password, salt, cost, length)

const encryptWithKey = (text: string, key: string): Promise<EncryptedData> => {
  return Aes.randomKey(16).then((iv: string) => {
    return Aes.encrypt(text, key, iv).then((cipher: string) => ({
      cipher,
      iv,
    }))
  })
}

const dencryptWithKey = (encryptedData: EncryptedData, key: string) =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

export default class Encryptor {
  static encrypt = async (password: string, data: any) => {
    const key = await generateKey(password, salt, cost, length)
    return await encryptWithKey(JSON.stringify(data), key)
  }

  static decrypt = async (password: string, decrypedData: EncryptedData) => {
    const key = await generateKey(password, salt, cost, length)
    const data = await dencryptWithKey(decrypedData, key)
    return JSON.parse(data)
  }
}
