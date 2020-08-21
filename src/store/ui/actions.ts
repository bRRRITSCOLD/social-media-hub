// node_modules
import {
  action,
  Action,
} from 'easy-peasy';
import { createUIStoreState, UIStoreStateInterface } from './state';

// libraries

// models

export interface UIStoreActionsInterface extends UIStoreStateInterface {
  setIsRegisterDialogOpen: Action<UIStoreActionsInterface, boolean>;
  setIsLoginDialogOpen: Action<UIStoreActionsInterface, boolean>;
}

export function createUIStoreActions(): UIStoreActionsInterface {
  return {
    ...createUIStoreState(),
    setIsRegisterDialogOpen: action((state, isRegisterDialogOpen) => {
      state.isRegisterDialogOpen = isRegisterDialogOpen;
    }),
    setIsLoginDialogOpen: action((state, isLoginDialogOpen) => {
      state.isLoginDialogOpen = isLoginDialogOpen;
    }),
  };
}
