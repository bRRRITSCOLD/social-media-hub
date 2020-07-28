// node_modules
import {
  action,
  Action,
} from 'easy-peasy';

// libraries

// models

export interface UserStoreInterface {
  isLoggedIn: boolean;
  emailAddress?: string;
  setIsLoggedIn: Action<UserStoreInterface, boolean>;
  setEmailAddress: Action<UserStoreInterface, string>;
}

export const userStore: UserStoreInterface = {
  isLoggedIn: false,
  emailAddress: '',
  setIsLoggedIn: action((state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn;
  }),
  setEmailAddress: action((state, emailAddress) => {
    state.emailAddress = emailAddress;
  }),
};
