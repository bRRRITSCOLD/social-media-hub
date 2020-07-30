// node_modules
import {
  action,
  Action,
  computed,
  Computed,
  thunk,
  Thunk,
} from 'easy-peasy';
import { get } from 'lodash';

// libraries
import { socialMediaHubApiClient } from '../lib/http';
import { delay } from '../lib/utils';

// models

export interface UserStoreInterface {
  jwt: string;
  registerUserError: Error | undefined;
  isRegisteringUser: boolean;
  isLoggedIn: Computed<UserStoreInterface, boolean>
  hasRegisterUserError: Computed<UserStoreInterface, boolean>
  registerUserErrorMessage: Computed<UserStoreInterface, string>
  setJwt: Action<UserStoreInterface, string>;
  setIsRegisteringUser: Action<UserStoreInterface, boolean>;
  setRegisterUserError: Action<UserStoreInterface, Error | undefined>;
  registerUser: Thunk<UserStoreInterface, { [key: string]: any }, UserStoreInterface>;
}

export const userStore: UserStoreInterface = {
  registerUserError: undefined,
  jwt: '',
  isRegisteringUser: false,
  isLoggedIn: computed((state) => state.jwt !== undefined && state.jwt !== ''),
  hasRegisterUserError: computed((state) => state.registerUserError !== undefined),
  registerUserErrorMessage: computed((state) => state.registerUserError?.message || ''),
  setJwt: action((state, jwt) => {
    state.jwt = jwt;
  }),
  setIsRegisteringUser: action((state, isRegisteringUser) => {
    state.isRegisteringUser = isRegisteringUser;
  }),
  setRegisterUserError: action((state, registerUserError) => {
    console.log(registerUserError);
    state.registerUserError = registerUserError;
  }),
  registerUser: thunk(async (actions, user) => {
    try {
      // indicate we are registering
      actions.setIsRegisteringUser(true);
      // clear any old errors
      actions.setRegisterUserError(undefined);
      // call api to register user
      const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/users',
        headers: { 'content-type': 'application/json' },
        data: {},
      });
      // indicate we are not regitering any more
      actions.setIsRegisteringUser(false);
      // return explicitly
      return;
    } catch (err) {
      // set the error in store
      actions.setRegisterUserError(err);
      // indicate we are not regitering any more
      actions.setIsRegisteringUser(false);
      // return explicitly
      return;
    }
  }),
};
