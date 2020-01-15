import React from 'react'

import RootView from './RootView'
import ToastView from './ToastView'
import LoadingView from './LoadingView'

import EnterPassword from './EnterPassword';
import FingerprintPop from './FingerprintPop';

import { FingerprintPopOptionsType, FingerprintConfigType, EnterPasswordConfigType } from './interface'

export class Toast {
  static hide = () => {
    RootView.setView()
  };

  static info(msg: string, time?: number, position?: string) {
    RootView.setView(<ToastView
      message={msg}
      time={time}
      position={position}
      onDismiss={this.hide}
    />)
  };

  // success
  static success(msg?: string, time?: number, position?: string) {
    RootView.setView(<ToastView
      message={msg || ''}
      time={time}
      position={position}
      isSuccess={true}
      onDismiss={this.hide}
    />)
  };

  // Toast Loading
  static loading(text?: string, time?: number, minTime?: number, maxTime?: number) {
    RootView.setView(<LoadingView
      text={text}
      time={time}
      onDismiss={this.hide}
    />)
  }
}

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

export default {
  Toast,
  Modal
}

