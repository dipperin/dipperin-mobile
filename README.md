# Dipperin Wallet

## Linking open

```js
// address: receive address
// amount: send amount
// scheme: your app scheme
Linking.openURL(`dp://sendcb?address=${address}&amount=${amount}&scheme=${scheme}`)

// callback url
`${scheme}://sendcb?success=${success}`
```
