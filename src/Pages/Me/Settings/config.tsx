import React from 'react'
import { Switch } from '@ant-design/react-native'
import System from 'Store/System'
import { StyleSheet } from 'react-native'
import { AntdListItemPropsType } from 'Global/inteface'
import { VENUS } from 'Global/constants'
import i18n from 'I18n'
import { Modal, Toast } from 'Components/PopupWindow'
import ChainData from 'Store/chainData'

export const FINGER_UNLOCK = 'fingerUnLock'
export const FINGER_PAY = 'fingerPay'
export const LANGEUAGE = 'language'
export const NODE_CHECKED = 'nodeChecked'

interface ListItemMainTypes {
  extraOnChange?: (key: string, value: boolean) => void
  onChangeItem?: (keyWord: string) => void
}

export const settingListItemsMain = (system: System, options: ListItemMainTypes): AntdListItemPropsType[] => [
  {
    title: i18n.t('dipperin:me.fingerUnlock'),
    extra: (
      <Switch
        checked={system.isFingerUnLock}
        onChange={(_value) => {
          if (!_value) {
            options.extraOnChange && options.extraOnChange(FINGER_UNLOCK, _value);
            return
          }

          Modal.FingerprintPopShow({
            startHint: i18n.t('dipperin:start.pleaseEnterFingerprint'),
            successHint: i18n.t('dipperin:me.openUnlockFunction'),
          },{
            fingerprintSuccessCb: () => options.extraOnChange && options.extraOnChange(FINGER_UNLOCK, _value),
            fingerprintFailCb: () => Toast.info(i18n.t('dipperin:start.checkFingerprintFail')),
            hide: () => Modal.hide(),
          })
        }}
      />
    ),
  },
  {
    title: i18n.t('dipperin:me.fingerPay'),
    extra: (
      <Switch
        checked={(() => {
          const result = system.isFingerUnLock ? system.isFingerPay : false
          options.extraOnChange && options.extraOnChange(FINGER_PAY, result)
          return result
        })()}
        disabled={!system.isFingerUnLock}
        onChange={(_value) => {
          const _switch = !system.isFingerUnLock ? false : _value

          if (!_value) {
            options.extraOnChange && options.extraOnChange(FINGER_PAY, _value);
            return
          }

          Modal.FingerprintPopShow({
            startHint: i18n.t('dipperin:start.pleaseEnterFingerprint'),
            successHint: i18n.t('dipperin:me.openFingerprintPayFunction'),
          },{
            fingerprintSuccessCb: () => options.extraOnChange && options.extraOnChange(FINGER_PAY, _switch),
            fingerprintFailCb: () => Toast.info(i18n.t('dipperin:start.checkFingerprintFail')),
            hide: () => Modal.hide(),
          })
        }}
      />
    ),
  },
  {
    title: i18n.t('dipperin:me.changePassword'),
    arrow: 'horizontal',
    onPress: () => options.onChangeItem && options.onChangeItem('modifyPassWord'),
  },
]

export const settingListItemsExt = (system: System, chainData: ChainData, options: ListItemMainTypes): AntdListItemPropsType[] => [
  {
    title: i18n.t('dipperin:me.language'),
    extra: system.curLanguage === 'en' ? i18n.t('dipperin:me.English') : i18n.t('dipperin:me.simplifiedChinese'),
    arrow: 'horizontal',
    onPress: () => options.onChangeItem && options.onChangeItem(LANGEUAGE),
  },
  {
    title: i18n.t('dipperin:me.nodeChoose'),
    extra: chainData.currentNet === VENUS
      ? i18n.t('dipperin:me.remoteNode') + ' - ' + i18n.t('dipperin:me.venus')
      : i18n.t('dipperin:me.remoteNode') + ' - ' + i18n.t('dipperin:me.mercury'),
    arrow: 'horizontal',
    onPress: () => options.onChangeItem && options.onChangeItem(NODE_CHECKED),
  },
]

export const styles = StyleSheet.create({
  listItem: {
    lineHeight: 54,
    fontSize: 18,
    color: '#333',
  },
})
