

const enResouce = {
  dipperin: {
    start: {
      create: 'Create wallet',
      import: 'Import wallet'
    },
    import: {
      title: '助记词导入',
      mnemonicPlh: '请按顺序输入助记词',
      passwordPlh: '请设置钱包密码',
      repeatPasswordPlh: '请重复密码',
      passwordTip: '密码提示信息(可不填)',
      agreeLabel: '我已仔细阅读并同意',
      agree: "《用户协议》",
      btnText: '导入钱包'
    },
    me: {
      
    }
  }

}

export type I18StartType = typeof enResouce.dipperin.start
export type I18ImportType = typeof enResouce.dipperin.import

const zhResource: typeof enResouce = {
  dipperin: {
    start: {
      create: '创建钱包',
      import: '导入钱包'
    },
    import: {
      title: '助记词导入',
      mnemonicPlh: '请按顺序输入助记词',
      passwordPlh: '请设置钱包密码',
      repeatPasswordPlh: '请重复密码',
      passwordTip: '密码提示信息(可不填)',
      agreeLabel: '我已仔细阅读并同意',
      agree: "《用户协议》",
      btnText: '导入钱包'
    },
    me: {

    }
  }
}

export const resource = {
  en: enResouce,
  zh: zhResource
}