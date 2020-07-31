// node_modules
import {
  action,
  Action,
} from 'easy-peasy';

// libraries

// models

export interface UIStoreInterface {
  isRegisterDialogOpen: boolean;
  isLoginDialogOpen: boolean;
  setIsRegisterDialogOpen: Action<UIStoreInterface, boolean>;
  setIsLoginDialogOpen: Action<UIStoreInterface, boolean>;
  // addPost: Action<TwitterStoreInterface, TwitterPostInterface>;
  // getPosts: Thunk<TwitterStoreInterface>;
  // postPost: Thunk<TwitterStoreInterface, TwitterPostInterface>;
  // new
  // getOAuthRequestToken: Thunk<TwitterStoreInterface>;
  // getOAuthAccessToken: Thunk<TwitterStoreInterface, { oAuthVerifier: string }>;
}

export const uiStore: UIStoreInterface = {
  isRegisterDialogOpen: false,
  isLoginDialogOpen: false,
  setIsRegisterDialogOpen: action((state, isRegisterDialogOpen) => {
    state.isRegisterDialogOpen = isRegisterDialogOpen;
  }),
  setIsLoginDialogOpen: action((state, isLoginDialogOpen) => {
    state.isLoginDialogOpen = isLoginDialogOpen;
  }),
};
