import React from 'react';

import RootView from './RootView';
import EnterPassword from './EnterPassword';
import FingerprintPop from './FingerprintPop';
import {sleep} from 'Global/utils';

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

  static FingerprintPopShow(
    fingerprintSuccessCb: () => void,
    fingerprintFailCb: () => void,
    hide: () => void,
  ) {
    RootView.setView(
      <FingerprintPop
        visible={true}
        isConfirm={false}
        onCancel={hide}
        fingerprintFailCb={fingerprintFailCb}
        fingerprintSuccessCb={fingerprintSuccessCb}
      />,
    );
  }
}

export default Modal;
