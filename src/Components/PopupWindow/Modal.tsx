import React from 'react'
import RootView from './RootView'

import EnterPassword from './EnterPassword';
import FingerprintPop from './FingerprintPop';

import { FingerprintPopOptionsType, FingerprintConfigType, EnterPasswordConfigType } from './interface'



export class Modal {
  static hide = () => {
    RootView.setView()
  }

  static enterPassword(onConfirm: (password: string) => Promise<void>, configer?: EnterPasswordConfigType,) {
    RootView.setView(
      <EnterPassword hasCancel={configer!.hasCancel} onClose={Modal.hide} onConfirm={onConfirm} />,
    );
  }

  static FingerprintPopShow(fingerprintConfig: FingerprintConfigType, options: FingerprintPopOptionsType) {
    RootView.setView(
      <FingerprintPop
        isSwitch={fingerprintConfig.isSwitch}
        startHint={fingerprintConfig.startHint}
        proccessHint={fingerprintConfig.proccessHint}
        successHint={fingerprintConfig.successHint}
        onCancel={options.hide}
        fingerprintFailCb={options.fingerprintFailCb}
        fingerprintSuccessCb={options.fingerprintSuccessCb}
      />,
    );
  }
}

export default Modal
