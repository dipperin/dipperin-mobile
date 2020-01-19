import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import { NativeModules } from 'react-native'
// import aesjs from 'aes-js'

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
jest.mock('react-native-randombytes', () => ({randomBytes: jest.fn((_, cb) =>{cb(undefined, {data: [248, 191, 40, 98, 16, 151, 214, 33, 70, 72, 177, 120, 6, 21, 2, 129], type: 'Buffer'})} )}))


// const localStorageMock = (() => {
//   const data = {};
//   const localStorage = {
//     getItem(key) {
//       return data[key] === undefined ? null : data[key];
//     },
//     setItem(key, value) {
//       data[key] = value;
//     },
//     removeItem(key) {
//       delete data[key];
//     },
//   };
//   return localStorage;
// })();
// const asyncStorageMock = (() => {
//   const data = {};
//   const asyncStorage = {
//     getItem(key) {
//       return new Promise((resolve, reject) => {
//         resolve(data[key]);
//       });
//     },
//     setItem(key, value) {
//       return new Promise((resolve, reject) => {
//         data[key] = value;
//         resolve();
//       });
//     },
//     removeItem(key) {
//       return new Promise((resolve, reject) => {
//         delete data[key];
//         resolve();
//       });
//     },
//   };
//   return asyncStorage;
// })();
// global.localStorage = localStorageMock;
// global.asyncStorage = asyncStorageMock;


jest.mock(
  '../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
  () => class MockNativeEventEmitter{
    addListener = () => jest.fn()
    removeListener = () => jest.fn()
    removeAllListeners = () => jest.fn()
  }
);

jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: () => 'en',
}))

// NativeModules.Aes = {
//   pbkdf2: jest.fn((password) => {
//     switch (password) {
//       case '12345678':
//         return '2148e2640019599be4748039e43e5aa65d41873f9986793144c1e67775b14d0c'
//       case '87654321':
//         return 'd35c1fee6bb2a1c9b0a74572980c173b2c55ccb8b3cf3b42dde7890e1c554a7'
//       default:
//         return '819213c93954ff6f151524a3067cdcc2bd3c1013134d1c1453b9f80f71e87b1f'
//     }
//   }),
//   randomKey: jest.fn(async () => '1989e445c06db6dd28c5e73503baa923'),
//   encrypt: jest.fn(async (text, key, iv) => {
//     const keyBytes = aesjs.utils.hex.toBytes(key)
//     const ivBytes = aesjs.utils.hex.toBytes(iv)
//     console.log(keyBytes, ivBytes, 'sssssssssss')
//     const aesCtr = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes)
//     const textBytes = aesjs.utils.utf8.toBytes(text)
//     const encryptedBytes = aesCtr.encrypt(textBytes)
//     return {
//       cipher: aesjs.encrypt(encryptedBytes),
//       iv,
//     }
//   }),
//   decrypt: jest.fn(async (decrypedData, key) => {
//     const keyBytes = aesjs.utils.hex.toBytes(key)
//     const ivBytes = aesjs.utils.hex.toBytes(decrypedData.iv)
//     const encryptedBytes = aesjs.utils.hex.toBytes(decrypedData.cipher)
//     const aesCbc = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);
//     const decryptedBytes = aesCbc.decrypt(encryptedBytes)
//     const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
//     return decryptedText
//   }),
// }
