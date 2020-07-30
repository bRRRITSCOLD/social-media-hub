// node_modules
import {
  action,
  Action,
  computed,
  Computed,
  thunk,
  Thunk,
} from 'easy-peasy';

// libraries
import { socialMediaHubApiClient } from '../lib/http';

// models
import { RegisterDialogFormInterface } from '../components/Register/RegisterDialog';
import { get } from 'lodash';

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
  registerUser: Thunk<UserStoreInterface, RegisterDialogFormInterface, UserStoreInterface>;
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
  registerUser: thunk(async (actions, registerUserInput) => {
    try {
      // deconstruct for ease
      const {
        firstName,
        lastName,
        emailAddress,
        password,
      } = registerUserInput;
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
};
