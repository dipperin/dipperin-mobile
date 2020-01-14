import React from 'react';

import RootView from './RootView';
import EnterPassword from './EnterPassword';
import FingerprintPop from './FingerprintPop';
import {sleep} from 'Global/utils';

interface FingerprintPopOptionsType {
  fingerprintSuccessCb: () => void,
  fingerprintFailCb: () => void,
  hide: () => void
}

class Modal {
  static hide = async () => {
    RootView.setView();
    await sleep(500);
  };

  static password(onConfirm: (password: string) => Promise<void>) {
    RootView.setView(
      <EnterPassword onClose={Modal.hide} onConfirm={onConfirm} />,
    );
  }

  static FingerprintPopShow(options: FingerprintPopOptionsType) {
    RootView.setView(
      <FingerprintPop
        visible={true}
        isConfirm={false}
        onCancel={options.hide}
        fingerprintFailCb={options.fingerprintFailCb}
        fingerprintSuccessCb={options.fingerprintSuccessCb}
      />,
    );
  }
}

export default Modal;
