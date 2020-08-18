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
import jwtDecode from 'jwt-decode';

// libraries
import { get } from 'lodash';
import { socialMediaHubApiClient } from '../lib/http';

// models
import { RegisterDialogFormInterface } from '../components/Register/RegisterDialog';
import { LoginDialogFormInterface } from '../components/Login/LoginDialog';

export interface UserStoreInterface {
  // data values
  session: {
    jwt: string;
    jwtRefreshToken: string;
  },
  // static/data values
  isRegisteringUser: boolean;
  isLoggingInUser: boolean;
  isRefreshingUserJWT: boolean;

  registerUserError: Error | undefined;
  loginUserError: Error | undefined;
  refreshUserJWTError: Error | undefined;

  showLoginUserError: boolean;
  showRegisterUserError: boolean;
  // computed values
  decodedJWT: Computed<UserStoreInterface, { [key: string]: any } | undefined>,

  isLoggedIn: Computed<UserStoreInterface, boolean>;
  isAuthenticatedWithTwitter: Computed<UserStoreInterface, boolean>;

  registerUserErrorMessage: Computed<UserStoreInterface, string>;
  loginUserErrorMessage: Computed<UserStoreInterface, string>;

  hasRegisterUserError: Computed<UserStoreInterface, boolean>;
  hasLoginUserError: Computed<UserStoreInterface, boolean>;
  // actions
  setSessionJWT: Action<UserStoreInterface, string>;
  setSessionJWTRefreshToken: Action<UserStoreInterface, string>;

  setIsRegisteringUser: Action<UserStoreInterface, boolean>;
  setIsLoggingInUser: Action<UserStoreInterface, boolean>;
  setIsRefreshingUserJWT: Action<UserStoreInterface, boolean>;

  setRegisterUserError: Action<UserStoreInterface, Error | undefined>;
  setLoginUserError: Action<UserStoreInterface, Error | undefined>;
  setRefreshUserJWTError: Action<UserStoreInterface, Error | undefined>;
  setShowLoginUserError: Action<UserStoreInterface, boolean>;
  setShowRegisterUserError: Action<UserStoreInterface, boolean>;
  // thunks
  registerUser: Thunk<UserStoreInterface, RegisterDialogFormInterface, UserStoreInterface>;
  loginUser: Thunk<UserStoreInterface, LoginDialogFormInterface, UserStoreInterface>;
  refreshUserJWT: Thunk<UserStoreInterface, { jwt: string; jwtRefreshToken: string; }, UserStoreInterface>;
}

export const userStore: UserStoreInterface = {
  // data values
  session: persist({
    jwt: '',
    jwtRefreshToken: '',
  }),
  isRegisteringUser: false,
  isLoggingInUser: false,
  isRefreshingUserJWT: false,
  registerUserError: undefined,
  loginUserError: undefined,
  refreshUserJWTError: undefined,
  showLoginUserError: false,
  showRegisterUserError: false,
  // computed values
  decodedJWT: computed((state) => {
    return state.session.jwt !== undefined && state.session.jwt !== ''
      ? jwtDecode(state.session.jwt)
      : undefined;
  }),
  isLoggedIn: computed((state) => {
    return state.decodedJWT !== undefined;
  }),
  isAuthenticatedWithTwitter: computed((state) => {
    return (get(state, 'decodedJWT.roles', [] as string[]) as string[]).includes('Twitter User');
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
  // actioncs
  setSessionJWT: action((state, jwt) => {
    state.session.jwt = jwt;
  }),
  setSessionJWTRefreshToken: action((state, jwtRefreshToken) => {
    state.session.jwtRefreshToken = jwtRefreshToken;
  }),
  setIsRegisteringUser: action((state, isRegisteringUser) => {
    state.isRegisteringUser = isRegisteringUser;
  }),
  setIsLoggingInUser: action((state, isLogginInUser) => {
    state.isRegisteringUser = isLogginInUser;
  }),
  setIsRefreshingUserJWT: action((state, isRefreshingUserJWT) => {
    state.isRefreshingUserJWT = isRefreshingUserJWT;
  }),
  setRegisterUserError: action((state, registerUserError) => {
    state.registerUserError = registerUserError;
  }),
  setLoginUserError: action((state, loginUserError) => {
    state.loginUserError = loginUserError;
  }),
  setRefreshUserJWTError: action((state, refreshUserJWTError) => {
    state.refreshUserJWTError = refreshUserJWTError;
  }),
  setShowLoginUserError: action((state, showLoginUserError) => {
    state.showLoginUserError = showLoginUserError;
  }),
  setShowRegisterUserError: action((state, showRegisterUserError) => {
    state.showRegisterUserError = showRegisterUserError;
  }),
  // thunks
  registerUser: thunk(async (actions, registerUserRequest) => {
    try {
      // deconstruct for ease
      const {
        firstName,
        lastName,
        emailAddress,
        password,
      } = registerUserRequest;
      // indicate to show error
      actions.setShowRegisterUserError(false);
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
      // indicate to show error
      actions.setShowRegisterUserError(true);
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
      // indicate not to show error
      actions.setShowLoginUserError(false);
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
              jwt,
              jwtRefreshToken
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
      actions.setSessionJWT((socialMediaHubApiClientResponse.data as { data: { loginUser: { jwt: string; }; }; }).data.loginUser.jwt);
      actions.setSessionJWTRefreshToken((socialMediaHubApiClientResponse.data as { data: { loginUser: { jwtRefreshToken: string; }; }; }).data.loginUser.jwtRefreshToken);
      // indicate we are not regitering any more
      actions.setIsLoggingInUser(false);
      // return explicitly
      return;
    } catch (err) {
      // set the error in store
      actions.setLoginUserError(err);
      // indicate we are not regitering any more
      actions.setIsLoggingInUser(false);
      // indicate to show error
      actions.setShowLoginUserError(true);
      // return explicitly
      return;
    }
  }),
  refreshUserJWT: thunk(async (actions, refreshUserJWTRequest) => {
    try {
      // indicate we are refreshing a fwt
      actions.setIsRefreshingUserJWT(true);
      // clear any old errors
      actions.setRefreshUserJWTError(undefined);
      // call api to register user
      const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/graphql',
        headers: { 'content-type': 'application/json', authorization: refreshUserJWTRequest.jwt },
        data: {
          query: `mutation refreshUserJWT($data: RefreshUserJWTInputType!) {
            refreshUserJWT(data: $data) {
              jwt,
              jwtRefreshToken
            }
          }`,
          variables: {
            data: {
              jwtRefreshToken: refreshUserJWTRequest.jwtRefreshToken,
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
      actions.setSessionJWT((socialMediaHubApiClientResponse.data as { data: { refreshUserJWT: { jwt: string; }; }; }).data.refreshUserJWT.jwt);
      actions.setSessionJWTRefreshToken((socialMediaHubApiClientResponse.data as { data: { refreshUserJWT: { jwtRefreshToken: string; }; }; }).data.refreshUserJWT.jwtRefreshToken);
      // indicate we are not regitering any more
      actions.setIsRefreshingUserJWT(false);
      // return explicitly
      return;
    } catch (err) {
      // set the error in store
      actions.setRefreshUserJWTError(err);
      // indicate we are not regitering any more
      actions.setIsRefreshingUserJWT(false);
      // return explicitly
      return;
    }
  }),
};
