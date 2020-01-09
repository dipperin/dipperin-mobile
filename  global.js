import { randomBytes } from 'react-native-randombytes'
import Crypto from 'crypto'

// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');

Crypto.randomBytes = (count) => new Promise((resolve, reject) => {
  return randomBytes(count, (err, bytes) => {
    if (err) reject(err)
    else resolve(bytes)
  })
})


if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}
