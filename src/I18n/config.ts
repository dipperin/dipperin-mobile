const enResource = {
  dipperin: {
    tabName:{
      me:'Me',
      discovery:'Discovery',
      wallet:'Wallet'
    },
    userProtocol: 'User agreement',
    start: {
      create: 'Create wallet',
      import: 'Import wallet',
    },
    discovery: {
      title: 'discovery',
      tab1: 'Hot DApp',
      tab2: 'Smart Contracts',
      tab3: 'Rich List',
      contracts: {
        address: 'Address',
        name: 'Name',
        txCount: 'TxCount',
        value: 'Value',
      },
      apps: {
        accounts: 'Accounts',
        txCount: 'TxCount',
        value: 'Value',
        moreDapp: 'Stay tuned for more DApps'
      },
      fortune: {
        ranking: 'Ranking',
        holdings: 'Holdings',
        address: 'Address',
        balance: 'Balance',
      }
    },
    import: {
      title: 'Import Mnemonic',
      mnemonicPlh: 'Mnemonic Phrase',
      passwordPlh: 'Set Password',
      repeatPasswordPlh: 'Repeat Password',
      passwordTip: 'Password prompt message (optional)',
      agreeLabel: 'I have carefully read and agreed to the ',
      agree: 'user agreement',
      btnText: 'Import Wallet',
      info: {
        mnemonicNotAvailable: 'Mnemonic not available!',
        passwordNotAvailable: 'Password must be 8~24 characters in length.',
        repeatPasswordErr: 'Two passwords do not match!'
      }
    },
    create: {
      title: 'Create Wallet',
      passwordPlh: 'Set Password',
      repeatPasswordPlh: 'Repeat Password',
      passwordTip: 'Password prompt message (optional)',
      agreeLabel: 'I have carefully read and agreed to the ',
      agree: 'user agreement',
      btnText: 'Create Wallet',
      info: {
        passwordNotAvailable: 'Password must be 8~24 characters in length.',
        repeatPasswordErr: 'Two passwords do not match!'
      }
    },
    createStep1: {
      title: 'Wallet Mnemonic',
      intro: 'Mnemonic phrase are the voucher to recover your wallet assets. Obtaining Mnemonic equals owning all assets. Please do backup and preserve it properly! Please be sure not to disturb the order of the mnemonic phrase.',
      item1: '• Mnemonic consists of 12 or 24 words. Please copy and keep in a safe place.',
      item2: '• 100% in your charge, once lost, can not be found.',
      item3: '• When creating a wallet, be sure to complete a mnemonic backup.',
      btnText: 'To Backup',
    },
    createStep2: {
      title: 'Backup mnemonic',
      intro:
        'Mnemonic phrase are the voucher to recover your wallet assets. Obtaining Mnemonic equals owning all assets. Please do backup and preserve it properly! Please be sure not to disturb the order of the mnemonic phrase.',
      menmonic: 'menmonic',
      btnText: 'To Backup',
    },
    createStep3: {
      title: 'Confirm mnemonic',
      intro:
        'Please select Mnemonic Phrase in correct order.',
      menmonic: 'menmonic',
      btnText: 'Confirm',
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
      psdLimit:
        'Password length is 8-24, is composed of Numbers, letters, symbols, letters are case sensitive',
      confrimChange: 'Confirm the change',
      forgetPassword: 'Forgot password?',
      walletProduction: 'The wallet products',
      versionUpdate: 'Version update',
    },
    transaction: {
      transaction: 'Transaction',
      toAddress: 'Receiver’s Address',
      enterAddressOrWord: 'Please enter address/Shortword',
      balance: 'Balance',
      sendAmount: 'Amount',
      enterAmount: 'Please enter amount',
      remark: 'Remark',
      enterRemark: 'Please enter remark',
      optional: 'Optional',
      txFee: 'Fee',
      send: 'Send',
      low: 'slow',
      middle: 'middle',
      high: 'fast',
      receive: 'Receive',
      shortWordReceive: 'Shortword Receive',
      shortword: 'Short Word',
      enterRegisterShortword: 'Please enter your Short Word',
      enterReceiveAmount: 'Please enter amount',
      remarkOptional: 'Remard(Optional)',
      ehterRemark: 'Please enter remark',
      sendShortword: 'Send Remark',
      enterPassword: 'Password',
      cancel: 'Cancel',
      confirm: 'Confirm',
      passwordHit: 'Password Hint',
      passwordError: 'Wrong Password!',
      sendSuccess: 'Send Success!',
      sendFailure: 'Send Failure',
    },
  },
};

export type I18StartType = typeof enResource.dipperin.start;
export type I18ImportType = typeof enResource.dipperin.import;
export type I18CreateType = typeof enResource.dipperin.create;
export type I18CreateStep1Type = typeof enResource.dipperin.createStep1;
export type I18CreateStep2Type = typeof enResource.dipperin.createStep2;
export type I18CreateStep3Type = typeof enResource.dipperin.createStep3;
export type I18nMeType = typeof enResource.dipperin.me;
export type I18nTransactionType = typeof enResource.dipperin.transaction;

const zhResource: typeof enResource = {
  dipperin: {
    tabName:{
      me:'我的',
      discovery:'发现',
      wallet:'钱包'
    },
    userProtocol: '用户协议',
    start: {
      create: '创建钱包',
      import: '导入钱包',
    },
    discovery: {
      title: '发现',
      tab1: '热门应用',
      tab2: '合约排行',
      tab3: '富豪榜',
      contracts: {
        address: '合约地址',
        name: '合约名称',
        txCount: '余额(DIP)',
        value: '交易数',
      },
      apps: {
        accounts: '用户',
        txCount: '交易数',
        value: '交易额',
        moreDapp: '更多DApp敬请期待'
      },
      fortune: {
        ranking: '排序',
        holdings: '持有量',
        address: '账户地址',
        balance: '余额(DIP)',
      }
    },
    import: {
      title: '助记词导入',
      mnemonicPlh: '请按顺序输入助记词',
      passwordPlh: '请设置钱包密码',
      repeatPasswordPlh: '请重复密码',
      passwordTip: '密码提示信息(可不填)',
      agreeLabel: '我已仔细阅读并同意',
      agree: '《用户协议》',
      btnText: '导入钱包',
      info: {
        mnemonicNotAvailable: '助记词不可用!',
        passwordNotAvailable: '密码长度为8~24个字符!',
        repeatPasswordErr: '两次密码不一致!'
      }
    },
    create: {
      title: '创建钱包',
      passwordPlh: '请设置钱包密码',
      repeatPasswordPlh: '请重复密码',
      passwordTip: '密码提示信息(可不填)',
      agreeLabel: '我已仔细阅读并同意',
      agree: '《用户协议》',
      btnText: '创建钱包',
      info: {
        passwordNotAvailable: '密码长度为8~24个字符!',
        repeatPasswordErr: '两次密码不一致!'
      }
    },
    createStep1: {
      title: '钱包助记词',
      intro: '助记词即为私钥，它是掌管您资产的钥匙，请妥善保管。',
      item1: '• 助记词由12或24个单词组成，请抄写并保管在安全的地方。',
      item2: '• 100%由您掌管，一经丢失，无法找回。',
      item3: '• 请在创建钱包时，务必完成助记词备份。',
      btnText: '去备份',
    },
    createStep2: {
      title: '备份助记词',
      intro:
        '助记词用于恢复钱包或重置钱包密码，将它按顺序准确的抄写在纸上或保存在安全的电子设备内，并存放在只有你知道的地方。',
      menmonic: '助记词',
      btnText: '去备份',
    },
    createStep3: {
      title: '确认助记词',
      intro:
        '为了确保您已将助记词正确抄写，备份保存，请按照对应的顺序点击助记词。',
      menmonic: '助记词',
      btnText: '完成',
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
    },
    transaction: {
      transaction: '转账',
      toAddress: '收款方',
      enterAddressOrWord: '接受地址/口令名称',
      sendAmount: '发送金额',
      balance: '余额',
      enterAmount: '输入转账金额',
      remark: '备注',
      optional: '选填',
      enterRemark: '输入备注',
      txFee: '交易费',
      send: '发送',
      low: '慢',
      middle: '中',
      high: '快',
      receive: '收款',
      shortWordReceive: '口令收款',
      shortword: '口令名称',
      enterRegisterShortword: '请输入注册口令',
      enterReceiveAmount: '请输入收款金额',
      remarkOptional: '备注(选填)',
      ehterRemark: '输入备注',
      sendShortword: '发送口令',
      enterPassword: '输入密码',
      cancel: '取消',
      confirm: '确认',
      passwordHit: '密码提示信息',
      passwordError: '密码错误',
      sendSuccess: '发送成功',
      sendFailure: '发送失败',
    },
  },
};

export const resource = {
  en: enResource,
  zh: zhResource,
};
