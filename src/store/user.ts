// node_modules
import {
  action,
  Action,
  computed,
  Computed,
  persist,
  thunk,
  Thunk,
} from 'easy-peasy';

// libraries
import { get } from 'lodash';
import { socialMediaHubApiClient } from '../lib/http';

// models
import { RegisterDialogFormInterface } from '../components/Register/RegisterDialog';
import { LoginDialogFormInterface } from '../components/Login/LoginDialog';

export interface UserStoreInterface {
  session: {
    jwt: string;
  }
  registerUserError: Error | undefined;
  loginUserError: Error | undefined;
  registerUserErrorMessage: Computed<UserStoreInterface, string>
  loginUserErrorMessage: Computed<UserStoreInterface, string>
  isRegisteringUser: boolean;
  isLoggingInUser: boolean;
  isLoggedIn: Computed<UserStoreInterface, boolean>
  hasRegisterUserError: Computed<UserStoreInterface, boolean>
  hasLoginUserError: Computed<UserStoreInterface, boolean>
  setSessionJwt: Action<UserStoreInterface, string>;
  setIsRegisteringUser: Action<UserStoreInterface, boolean>;
  setIsLoggingInUser: Action<UserStoreInterface, boolean>;
  setRegisterUserError: Action<UserStoreInterface, Error | undefined>;
  setLoginUserError: Action<UserStoreInterface, Error | undefined>;
  registerUser: Thunk<UserStoreInterface, RegisterDialogFormInterface, UserStoreInterface>;
  loginUser: Thunk<UserStoreInterface, LoginDialogFormInterface, UserStoreInterface>;
}

export const userStore: UserStoreInterface = {
  session: persist({
    jwt: '',
  }),
  registerUserError: undefined,
  loginUserError: undefined,
  isRegisteringUser: false,
  isLoggingInUser: false,
  isLoggedIn: computed((state) => {
    return state.session.jwt !== undefined && state.session.jwt !== '';
  }),
  hasRegisterUserError: computed((state) => {
    return state.registerUserError !== undefined;
  }),
  hasLoginUserError: computed((state) => {
    return state.loginUserError !== undefined;
  }),
  registerUserErrorMessage: computed((state) => {
    return state.registerUserError?.message || '';
  }),
  loginUserErrorMessage: computed((state) => {
    return state.loginUserError?.message || '';
  }),
  setSessionJwt: action((state, jwt) => {
    state.session.jwt = jwt;
  }),
  setIsRegisteringUser: action((state, isRegisteringUser) => {
    state.isRegisteringUser = isRegisteringUser;
  }),
  setIsLoggingInUser: action((state, isLogginInUser) => {
    state.isRegisteringUser = isLogginInUser;
  }),
  setRegisterUserError: action((state, registerUserError) => {
    state.registerUserError = registerUserError;
  }),
  setLoginUserError: action((state, loginUserError) => {
    state.loginUserError = loginUserError;
  }),
  registerUser: thunk(async (actions, registerUserRequest) => {
    try {
      // deconstruct for ease
      const {
        firstName,
        lastName,
        emailAddress,
        password,
      } = registerUserRequest;
      // indicate we are registering
      actions.setIsRegisteringUser(true);
      // clear any old errors
      actions.setRegisterUserError(undefined);
      // call api to register user
      const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/graphql',
        headers: { 'content-type': 'application/json' },
        data: {
          query: `mutation registerUser($data: RegisterUserInputType!) {
            registerUser(data: $data) {
              firstName,
              lastName,
              emailAddress,
              password
            }
          }`,
          variables: {
            data: {
              firstName,
              lastName,
              emailAddress,
              password,
            },
          },
        },
      });
      // validate response is okay
      if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
        throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
      }
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
  loginUser: thunk(async (actions, loginUserRequest) => {
    try {
      // deconstruct for ease
      const {
        emailAddress,
        password,
      } = loginUserRequest;
      // indicate we are registering
      actions.setIsLoggingInUser(true);
      // clear any old errors
      actions.setLoginUserError(undefined);
      // call api to register user
      const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/graphql',
        headers: { 'content-type': 'application/json' },
        data: {
          query: `mutation loginUser($data: LoginUserInputType!) {
            loginUser(data: $data) {
              jwt
            }
          }`,
          variables: {
            data: {
              emailAddress,
              password,
            },
          },
        },
      });
      // validate response is okay
      if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
        throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
      }
      // set session jwt
      actions.setSessionJwt((socialMediaHubApiClientResponse.data as { data: { loginUser: { jwt: string; }; }; }).data.loginUser.jwt);
      // indicate we are not regitering any more
      actions.setIsLoggingInUser(false);
      // return explicitly
      return;
    } catch (err) {
      // set the error in store
      actions.setLoginUserError(err);
      // indicate we are not regitering any more
      actions.setIsLoggingInUser(false);
      // return explicitly
      return;
    }
  }),
};
