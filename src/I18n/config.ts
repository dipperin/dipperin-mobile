

const enResource = {
  dipperin: {
    userProtocol: 'User agreement',
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
    create: {
      title: '创建钱包',
      mnemonicPlh: '请按顺序输入助记词',
      passwordPlh: '请设置钱包密码',
      repeatPasswordPlh: '请重复密码',
      passwordTip: '密码提示信息(可不填)',
      agreeLabel: '我已仔细阅读并同意',
      agree: "《用户协议》",
      btnText: '创建钱包'
    },
    createStep1: {
      title: '钱包助记词',
      intro: '助记词即为私钥，它是掌管您资产的钥匙，请妥善保管。',
      item1: '• 助记词由12或24个单词组成，请抄写并保管在安全的地方。',
      item2: '• 100%由您掌管，一经丢失，无法找回。',
      item3: '• 请在创建钱包时，务必完成助记词备份。',
      btnText: '去备份'
    },
    createStep2: {
      title: '备份助记词',
      intro: '助记词用于恢复钱包或重置钱包密码，将它按顺序准确的抄写在纸上或保存在安全的电子设备内，并存放在只有你知道的地方。',
      menmonic: '助记词',
      btnText: '去备份'
    },
    createStep3: {
      title: '确认助记词',
      intro: '为了确保您已将助记词正确抄写，备份保存，请按照对应的顺序点击助记词。',
      menmonic: '助记词',
      btnText: '完成'
    },
    me: {
      personalCenter: 'Personal center',
      setting: 'Setting',
      aboutUs: 'About us',
      FAQ: 'FAQ',
      language: 'Language',
      nodeChoose: 'Node selection',
      functionIntroduction: 'Function introduction',
      helpCenter: 'Help center',
      helpCenterDetails: 'Help center details',
      fingerUnlock: 'Fingerprint unlocking',
      fingerPay: 'Fingerprint payment',
      changePassword: 'Change password',
      simplifiedChinese: '简体中文',
      English: 'English',
      remoteNode: 'Remote node',
      venus: 'venus',
      mercury: 'mercury',
      oldPassword: 'The old password',
      newPassword: 'The new password',
      confrimPassword: 'Confirm password',
      pleaseEnterOldPsd: 'Please enter the old password',
      pleaseEnterNewPsd: 'Please enter a new password',
      pleaseConfirmNewPsd: 'Please confirm the new password',
      psdLimit: 'Password length is 8-24, is composed of Numbers, letters, symbols, letters are case sensitive',
      confrimChange: 'Confirm the change',
      forgetPassword: 'Forgot password?',
      walletProduction: 'The wallet products',
      versionUpdate: 'Version update',
    }
  }

}

export type I18StartType = typeof enResource.dipperin.start
export type I18ImportType = typeof enResource.dipperin.import
export type I18CreateType = typeof enResource.dipperin.create
export type I18CreateStep1Type = typeof enResource.dipperin.createStep1
export type I18CreateStep2Type = typeof enResource.dipperin.createStep2
export type I18CreateStep3Type = typeof enResource.dipperin.createStep3
export type I18nMeType = typeof enResource.dipperin.me

const zhResource: typeof enResource = {
  dipperin: {
    userProtocol: '用户协议',
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
    create: {
      title: '创建钱包',
      mnemonicPlh: '请按顺序输入助记词',
      passwordPlh: '请设置钱包密码',
      repeatPasswordPlh: '请重复密码',
      passwordTip: '密码提示信息(可不填)',
      agreeLabel: '我已仔细阅读并同意',
      agree: "《用户协议》",
      btnText: '创建钱包'
    },
    createStep1: {
      title: '钱包助记词',
      intro: '助记词即为私钥，它是掌管您资产的钥匙，请妥善保管。',
      item1: '• 助记词由12或24个单词组成，请抄写并保管在安全的地方。',
      item2: '• 100%由您掌管，一经丢失，无法找回。',
      item3: '• 请在创建钱包时，务必完成助记词备份。',
      btnText: '去备份'
    },
    createStep2: {
      title: '备份助记词',
      intro: '助记词用于恢复钱包或重置钱包密码，将它按顺序准确的抄写在纸上或保存在安全的电子设备内，并存放在只有你知道的地方。',
      menmonic: '助记词',
      btnText: '去备份'
    },
    createStep3: {
      title: '确认助记词',
      intro: '为了确保您已将助记词正确抄写，备份保存，请按照对应的顺序点击助记词。',
      menmonic: '助记词',
      btnText: '完成'
    },
    me: {
      personalCenter: '个人中心',
      setting: '设置',
      aboutUs: '关于我们',
      FAQ: 'FAQ',
      language: '语言',
      nodeChoose: '节点选择',
      functionIntroduction: '功能介绍',
      helpCenter: '帮助中心',
      helpCenterDetails: '帮助中心详情',
      fingerUnlock: '指纹解锁',
      fingerPay: '指纹支付',
      changePassword: '修改密码',
      simplifiedChinese: '简体中文',
      English: 'English',
      remoteNode: '远程节点',
      venus: '金星',
      mercury: '内测网',
      oldPassword: '旧密码',
      newPassword: '新密码',
      confrimPassword: '确认密码',
      pleaseEnterOldPsd: '请输入旧密码',
      pleaseEnterNewPsd: '请输入新密码',
      pleaseConfirmNewPsd: '请确认新密码',
      psdLimit: '密码长度为8-24位，由数字、字母、符号组成，字母区分大小写',
      confrimChange: '确认修改',
      forgetPassword: '忘记密码?',
      walletProduction: '钱包产品',
      versionUpdate: '版本更新',
    }
  }
}

export const resource = {
  en: enResource,
  zh: zhResource
}