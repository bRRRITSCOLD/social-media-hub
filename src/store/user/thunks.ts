// node_modules
import { thunk, Thunk } from 'easy-peasy';
import {
  Subject, of, from, Observable, interval,
} from 'rxjs';
import {
  catchError, map, concatMap, takeUntil, tap,
} from 'rxjs/operators';

// libraries
import {
  loginUser, refreshUserJWT, registerUser,
} from '../../lib/http';

// models
import { RegisterDialogFormInterface } from '../../components/Register/RegisterDialog';
import { LoginDialogFormInterface } from '../../components/Login/LoginDialog';

// actions + state
import { createUserStoreActions, UserStoreActionsInterface } from './actions';

export interface UserStoreThunksInterface extends UserStoreActionsInterface {
  startPollingRefreshUserJWT: Thunk<UserStoreThunksInterface, { jwt: string; jwtRefreshToken: string; }>;
  handlePollingRefreshUserJWT: Thunk<UserStoreThunksInterface, { jwt: string; jwtRefreshToken: string; }>;
  stopPollingRefreshUserJWT: Thunk<UserStoreThunksInterface>;

  registerUser: Thunk<UserStoreThunksInterface, RegisterDialogFormInterface, UserStoreThunksInterface>;
  loginUser: Thunk<UserStoreThunksInterface, LoginDialogFormInterface, UserStoreThunksInterface>;
  refreshUserJWT: Thunk<UserStoreThunksInterface, { jwt: string; jwtRefreshToken: string; }, UserStoreThunksInterface>;
}

export function createUserStoreThunks(): UserStoreThunksInterface {
  let refreshUserJWTUnsubscribe$: Subject<undefined>;
  let refreshUserJWT$: Observable<any>;

  const startPollingRefreshUserJWT = (startPollingRefreshUserJWTRequest: {
    jwt: string;
    jwtRefreshToken: string;
  }) => {
    // create the unsubscribe for
    // our silent refresh user jwt
    // functionality
    refreshUserJWTUnsubscribe$ = new Subject();
    // start to silently refresh a
    // user's jwt every 10 mins
    refreshUserJWT$ = interval(60000).pipe(
      takeUntil(refreshUserJWTUnsubscribe$),
      concatMap((_: any) => from(refreshUserJWT({
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
      )),
    );
  };
  // return store
  return {
    ...createUserStoreActions(),
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
      if (refreshUserJWT$) {
        // eslint-disable-next-line prefer-arrow-callback
        refreshUserJWT$.subscribe(actions.handlePollingRefreshUserJWT);
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
