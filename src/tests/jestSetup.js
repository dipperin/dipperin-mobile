import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NativeModules } from 'react-native'
import aesjs from 'aes-js'
import pbkdf2 from 'pbkdf2'

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
// {data: [248, 191, 40, 98, 16, 151, 214, 33, 70, 72, 177, 120, 6, 21, 2, 129], type: 'Buffer'}
jest.mock('react-native-randombytes', () => ({randomBytes: jest.fn((_, cb) =>{cb(undefined, Buffer.from([248, 191, 40, 98, 16, 151, 214, 33, 70, 72, 177, 120, 6, 21, 2, 129]))} )}))


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

NativeModules.Aes = {
  pbkdf2: jest.fn(async (password) => {
    return [...pbkdf2.pbkdf2Sync(password, 'salt', 1, 16, 'sha512')]
  }),
  randomKey: jest.fn(async () => '1989e445c06db6dd28c5e73503baa923'),
  encrypt: jest.fn(async (text, key) => {
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const textBytes = aesjs.utils.utf8.toBytes(text)
    const encryptedBytes = aesCtr.encrypt(textBytes)
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    return encryptedHex
  }),
  decrypt: jest.fn(async (encryptedHex, key) => {
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)
    const decryptedBytes = aesCtr.decrypt(encryptedBytes)
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText
  }),
}
