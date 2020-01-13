import { I18nMeType } from "I18n/config";

export const passwordCheck = (oldPassword: string, newPassword: string, confirmPassword: string, lange: I18nMeType) => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    return lange.passwordEmpty
  }

  if (newPassword.length < 8 || newPassword.length > 24) {
    return lange.psdLimit
  }

  if (newPassword !== confirmPassword) {
    return lange.diffPassword
  }

  return ''
}