// node_modules
import {
  action,
  Action,
} from 'easy-peasy';

// state
import { UserStoreStateInterface, createUserStoreState } from './state';

export interface UserStoreActionsInterface extends UserStoreStateInterface {
  setSessionJWT: Action<UserStoreActionsInterface, string>;
  setSessionJWTRefreshToken: Action<UserStoreActionsInterface, string>;

  setIsRegisteringUser: Action<UserStoreActionsInterface, boolean>;
  setIsLoggingInUser: Action<UserStoreActionsInterface, boolean>;
  setIsRefreshingUserJWT: Action<UserStoreActionsInterface, boolean>;
  setIsPollingRefreshUserJWT: Action<UserStoreActionsInterface, boolean>;

  setRegisterUserError: Action<UserStoreActionsInterface, Error | undefined>;
  setLoginUserError: Action<UserStoreActionsInterface, Error | undefined>;
  setRefreshUserJWTError: Action<UserStoreActionsInterface, Error | undefined>;
  setPollRefreshUserJWTError: Action<UserStoreActionsInterface, Error | undefined>;

  setShowLoginUserError: Action<UserStoreActionsInterface, boolean>;
  setShowRegisterUserError: Action<UserStoreActionsInterface, boolean>;
  setShowRefreshUserJWTError: Action<UserStoreActionsInterface, boolean>;
  setShowPollRefreshUserJWTError: Action<UserStoreActionsInterface, boolean>;
}

export function createUserStoreActions(): UserStoreActionsInterface {
  // return store
  return {
    ...createUserStoreState(),
    // actions
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
    setIsPollingRefreshUserJWT: action((state, isPollingRefreshUserJWT) => {
      state.isPollingRefreshUserJWT = isPollingRefreshUserJWT;
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
    setPollRefreshUserJWTError: action((state, pollRefreshUserJWTError) => {
      state.pollRefreshUserJWTError = pollRefreshUserJWTError;
    }),

    setShowLoginUserError: action((state, showLoginUserError) => {
      state.showLoginUserError = showLoginUserError;
    }),
    setShowRegisterUserError: action((state, showRegisterUserError) => {
      state.showRegisterUserError = showRegisterUserError;
    }),
    setShowRefreshUserJWTError: action((state, showRefreshUserJWTError) => {
      state.showRefreshUserJWTError = showRefreshUserJWTError;
    }),
    setShowPollRefreshUserJWTError: action((state, showPollRefreshUserJWTError) => {
      state.showPollRefreshUserJWTError = showPollRefreshUserJWTError;
    }),
  };
}
