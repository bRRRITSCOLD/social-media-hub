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
import { get } from 'lodash';
import jwtDecode from 'jwt-decode';
import {
  interval, Subject, of, from, Observable,
} from 'rxjs';
import {
  catchError, map, concatMap, takeUntil, tap,
} from 'rxjs/operators';

// libraries
import {
  loginUser, refreshUserJWT, registerUser,
} from '../lib/http';

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
  decodedJWT: Computed<UserStoreInterface, { [key: string]: any } | undefined>,

  isLoggedIn: Computed<UserStoreInterface, boolean>;
  isAuthenticatedWithTwitter: Computed<UserStoreInterface, boolean>;

  registerUserErrorMessage: Computed<UserStoreInterface, string>;
  loginUserErrorMessage: Computed<UserStoreInterface, string>;
  refreshUserJWTErrorMessage: Computed<UserStoreInterface, string>;
  pollRefreshUserJWTErrorMessage: Computed<UserStoreInterface, string>;

  hasRegisterUserError: Computed<UserStoreInterface, boolean>;
  hasLoginUserError: Computed<UserStoreInterface, boolean>;
  hasRefreshUserJWTError: Computed<UserStoreInterface, boolean>;
  hasPollRefreshUserJWTError: Computed<UserStoreInterface, boolean>;

  // actions
  setSessionJWT: Action<UserStoreInterface, string>;
  setSessionJWTRefreshToken: Action<UserStoreInterface, string>;

  setIsRegisteringUser: Action<UserStoreInterface, boolean>;
  setIsLoggingInUser: Action<UserStoreInterface, boolean>;
  setIsRefreshingUserJWT: Action<UserStoreInterface, boolean>;
  setIsPollingRefreshUserJWT: Action<UserStoreInterface, boolean>;

  setRegisterUserError: Action<UserStoreInterface, Error | undefined>;
  setLoginUserError: Action<UserStoreInterface, Error | undefined>;
  setRefreshUserJWTError: Action<UserStoreInterface, Error | undefined>;
  setPollRefreshUserJWTError: Action<UserStoreInterface, Error | undefined>;

  setShowLoginUserError: Action<UserStoreInterface, boolean>;
  setShowRegisterUserError: Action<UserStoreInterface, boolean>;
  setShowRefreshUserJWTError: Action<UserStoreInterface, boolean>;
  setShowPollRefreshUserJWTError: Action<UserStoreInterface, boolean>;

  // thunks
  startPollingRefreshUserJWT: Thunk<UserStoreInterface, { jwt: string; jwtRefreshToken: string; }>;
  handlePollingRefreshUserJWT: Thunk<UserStoreInterface, { jwt: string; jwtRefreshToken: string; }>;
  stopPollingRefreshUserJWT: Thunk<UserStoreInterface>;

  registerUser: Thunk<UserStoreInterface, RegisterDialogFormInterface, UserStoreInterface>;
  loginUser: Thunk<UserStoreInterface, LoginDialogFormInterface, UserStoreInterface>;
  refreshUserJWT: Thunk<UserStoreInterface, { jwt: string; jwtRefreshToken: string; }, UserStoreInterface>;
}

export function createUserStore(): UserStoreInterface {
  let refreshUserJWTUnsubscribe$: Subject<undefined>;
  let refreshUserJWT$: Observable<any>;
  let refreshUserJWTTicker$: Observable<any>;

  const startPollingRefreshUserJWT = (startPollingRefreshUserJWTRequest: {
    jwt: string;
    jwtRefreshToken: string;
  }) => {
    /* Observables */
    refreshUserJWTUnsubscribe$ = new Subject();

    refreshUserJWT$ = from(refreshUserJWT({
      jwt: startPollingRefreshUserJWTRequest.jwt,
      jwtRefreshToken: startPollingRefreshUserJWTRequest.jwtRefreshToken,
    })).pipe(
      takeUntil(refreshUserJWTUnsubscribe$),
      map((refreshUserJWTResponse: { jwt: string; jwtRefreshToken: string }) => ({
        jwt: refreshUserJWTResponse.jwt,
        jwtRefreshToken: refreshUserJWTResponse.jwtRefreshToken,
      })),
      tap((response: { jwt: string; jwtRefreshToken: string }) => response),
      catchError(() => of('EMPTY')),
    );

    refreshUserJWTTicker$ = interval(600000).pipe(
      takeUntil(refreshUserJWTUnsubscribe$),
      concatMap((_: any) => refreshUserJWT$),
    );
  };

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

    // thunks
    startPollingRefreshUserJWT: thunk((actions, { jwt, jwtRefreshToken }) => {
      // set/indicate that we are polling to refresh
      // a user's jwt silently without them knowing
      actions.setIsPollingRefreshUserJWT(true);
      // create observable/start subscription
      startPollingRefreshUserJWT({
        jwt,
        jwtRefreshToken,
      });
      // now subscribe to the response of the
      // call to refresh the user jwt every x seconds
      if (refreshUserJWTTicker$) {
        // eslint-disable-next-line prefer-arrow-callback
        refreshUserJWTTicker$.subscribe(actions.handlePollingRefreshUserJWT);
      }
    }),
    stopPollingRefreshUserJWT: thunk((actions) => {
      // now unsubscribe to the response of the
      // call to refresh the user jwt every x seconds
      if (refreshUserJWTUnsubscribe$) {
        refreshUserJWTUnsubscribe$.next();
      }
      // set/indicate that we are done polling to refresh
      // a user's jwt silently without them knowing
      actions.setIsPollingRefreshUserJWT(false);
    }),
    handlePollingRefreshUserJWT: thunk((actions, { jwt, jwtRefreshToken }) => {
      // set session jwt
      actions.setSessionJWT(jwt);
      actions.setSessionJWTRefreshToken(jwtRefreshToken);
      // unsubscribe any old subscriptions
      actions.stopPollingRefreshUserJWT();
      // start new supscription
      actions.startPollingRefreshUserJWT({ jwt, jwtRefreshToken });
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
        // indicate to show error
        actions.setShowRegisterUserError(false);
        // indicate we are registering
        actions.setIsRegisteringUser(true);
        // clear any old errors
        actions.setRegisterUserError(undefined);
        // call api to register user
        await registerUser({
          firstName,
          lastName,
          emailAddress,
          password,
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
        const loginUserResponse = await loginUser({
          emailAddress,
          password,
        });
        // set session jwt
        actions.setSessionJWT(loginUserResponse.jwt);
        actions.setSessionJWTRefreshToken(loginUserResponse.jwtRefreshToken);
        // indicate we are not regitering any more
        actions.setIsLoggingInUser(false);
        // stop old instances of refreshing a user's jwt silently
        actions.stopPollingRefreshUserJWT();
        // start refreshing a user's jwt silently
        actions.startPollingRefreshUserJWT({
          jwt: loginUserResponse.jwt,
          jwtRefreshToken: loginUserResponse.jwtRefreshToken,
        });
        // return explicitly
        return;
      } catch (err) {
        // set the error in store
        actions.setLoginUserError(err);
        // indicate we are not regitering any more
        actions.setIsLoggingInUser(false);
        // indicate to show error
        actions.setShowLoginUserError(true);
        // stop old instances of refreshing a user's jwt silently
        actions.stopPollingRefreshUserJWT();
        // return explicitly
        return;
      }
    }),
    refreshUserJWT: thunk(async (actions, refreshUserJWTRequest) => {
      try {
        // deconstruct for ease
        const {
          jwt,
          jwtRefreshToken,
        } = refreshUserJWTRequest;
        // indicate we are refreshing a jwt
        actions.setIsRefreshingUserJWT(true);
        // clear any old errors
        actions.setRefreshUserJWTError(undefined);
        // call api to register user
        const refreshUserJWTResponse = await refreshUserJWT({
          jwt,
          jwtRefreshToken,
        });
        // set session jwt
        actions.setSessionJWT(refreshUserJWTResponse.jwt);
        actions.setSessionJWTRefreshToken(refreshUserJWTResponse.jwtRefreshToken);
        // indicate we are not regitering any more
        actions.setIsRefreshingUserJWT(false);
        // stop old instances of refreshing a user's jwt silently
        actions.stopPollingRefreshUserJWT();
        // start refreshing a user's jwt silently
        actions.startPollingRefreshUserJWT({
          jwt: refreshUserJWTResponse.jwt,
          jwtRefreshToken: refreshUserJWTResponse.jwtRefreshToken,
        });
        // return explicitly
        return;
      } catch (err) {
        // set the error in store
        actions.setRefreshUserJWTError(err);
        // indicate we are not regitering any more
        actions.setIsRefreshingUserJWT(false);
        // stop old instances of refreshing a user's jwt silently
        actions.stopPollingRefreshUserJWT();
        // return explicitly
        return;
      }
    }),
  };
}
