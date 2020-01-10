import React from 'react';

import RootView from './RootView';
import EnterPassword from './EnterPassword';

class Modal {
  static hide = () => {
    RootView.setView();
  };

  static password(onConfirm: (password: string) => Promise<void>) {
    RootView.setView(
      <EnterPassword
        onClose={Modal.hide}
        onConfirm={onConfirm}
      />,
    );
  }
}

export default Modal;
