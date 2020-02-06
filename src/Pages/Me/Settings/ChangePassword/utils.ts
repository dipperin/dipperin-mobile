import { I18nMeType } from 'I18n/config';

export const passwordCheck = (oldPassword: string, newPassword: string, confirmPassword: string, lange: I18nMeType) => {
  switch (true) {
    case !oldPassword:
      return lange.pleaseFill + lange.oldPassword
    case !newPassword:
      return lange.pleaseFill + lange.newPassword
    case !confirmPassword:
      return lange.pleaseFill + lange.confrimPassword
    case newPassword.length < 8:
    case newPassword.length > 24:
      return lange.psdLimit
    case newPassword !== confirmPassword:
      return lange.diffPassword
    default:
      return ''
  }
}

