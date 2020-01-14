import { NativeModules, Platform } from 'react-native'
const Aes = NativeModules.Aes

const salt = 'salt'
const cost = 5000
const length = 256

export interface EncryptedData {
    cipher: string
    iv: string
}

const generateKey = (password: string, salt: string, cost: number, length: number) => Aes.pbkdf2(password, salt, cost, length)

const encryptWithKey = (text: string, key: string): Promise<EncryptedData> => {
    return Aes.randomKey(16).then((iv: string) => {
        return Aes.encrypt(text, key, iv).then((cipher: string) => ({
            cipher,
            iv,
        }))
    })
}

const dencryptWithKey = (encryptedData: EncryptedData, key: string) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

export default class Encryptor {
    static encrypt = async (password: string, data: any) => {
        try {
            const key = await generateKey(password, salt, cost, length)
            return await encryptWithKey(JSON.stringify(data),key)
        } catch(err) {
            console.log(err) 
        }
    }

    static decrypt = async (password: string, decrypedData: EncryptedData) => {
        try {
            const key = await generateKey(password, salt, cost, length)
            const data = await dencryptWithKey(decrypedData, key)
            return JSON.parse(data)
        } catch(err) {
            console.log(err)
        }
    }

}




// try {
//     generateKey('Arnold', 'salt', 5000, 256).then((key: string) => {
//         console.log('Key:', key)
//         encrypt('These violent delights have violent ends', key)
//             .then(({ cipher, iv }: DecryptedData) => {
//                 console.log('Encrypted:', cipher)

//                 decrypt({ cipher, iv }, key)
//                     .then((text: string) => {
//                         console.log('Decrypted:', text)
//                     })
//                     .catch((error: Error) => {
//                         console.log(error)
//                     })

//                 Aes.hmac256(cipher, key).then((hash: string) => {
//                     console.log('HMAC', hash)
//                 })
//             })
//             .catch((error: Error) => {
//                 console.log(error)
//             })
//     })
// } catch (e) {
//     console.error(e)
// }