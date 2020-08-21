// node_modules
import {
  computed,
  Computed,
  persist,
} from 'easy-peasy';
import { get } from 'lodash';
import jwtDecode from 'jwt-decode';

export interface UserStoreStateInterface {
  // data values
  session: {
    jwt: string;
    jwtRefreshToken: string;
  },
  // static/data values
  isRegisteringUser: boolean;
  isLoggingInUser: boolean;
  isRefreshingUserJWT: boolean;
  isPollingRefreshUserJWT: boolean;

  registerUserError: Error | undefined;
  loginUserError: Error | undefined;
  refreshUserJWTError: Error | undefined;
  pollRefreshUserJWTError: Error | undefined;

  showLoginUserError: boolean;
  showRegisterUserError: boolean;
  showRefreshUserJWTError: boolean;
  showPollRefreshUserJWTError: boolean;

  // computed values
  decodedJWT: Computed<UserStoreStateInterface, { [key: string]: any } | undefined>,

  isLoggedIn: Computed<UserStoreStateInterface, boolean>;
  isAuthenticatedWithTwitter: Computed<UserStoreStateInterface, boolean>;

  registerUserErrorMessage: Computed<UserStoreStateInterface, string>;
  loginUserErrorMessage: Computed<UserStoreStateInterface, string>;
  refreshUserJWTErrorMessage: Computed<UserStoreStateInterface, string>;
  pollRefreshUserJWTErrorMessage: Computed<UserStoreStateInterface, string>;

  hasRegisterUserError: Computed<UserStoreStateInterface, boolean>;
  hasLoginUserError: Computed<UserStoreStateInterface, boolean>;
  hasRefreshUserJWTError: Computed<UserStoreStateInterface, boolean>;
  hasPollRefreshUserJWTError: Computed<UserStoreStateInterface, boolean>;
}

export function createUserStoreState(): UserStoreStateInterface {
  // return store
  return {
    // data values
    session: persist({
      jwt: '',
      jwtRefreshToken: '',
    }),

    isRegisteringUser: false,
    isLoggingInUser: false,
    isRefreshingUserJWT: false,
    isPollingRefreshUserJWT: false,

    registerUserError: undefined,
    loginUserError: undefined,
    refreshUserJWTError: undefined,
    pollRefreshUserJWTError: undefined,

    showLoginUserError: false,
    showRegisterUserError: false,
    showRefreshUserJWTError: false,
    showPollRefreshUserJWTError: false,

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
    hasRefreshUserJWTError: computed((state) => {
      return state.refreshUserJWTError !== undefined;
    }),
    hasPollRefreshUserJWTError: computed((state) => {
      return state.pollRefreshUserJWTError !== undefined;
    }),

    registerUserErrorMessage: computed((state) => {
      return state.registerUserError?.message || '';
    }),
    loginUserErrorMessage: computed((state) => {
      return state.loginUserError?.message || '';
    }),
    refreshUserJWTErrorMessage: computed((state) => {
      return state.refreshUserJWTError?.message || '';
    }),
    pollRefreshUserJWTErrorMessage: computed((state) => {
      return state.pollRefreshUserJWTError?.message || '';
    }),
  };
}
