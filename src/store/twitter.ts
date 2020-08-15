// node_modules
import {
  action,
  Action,
  computed,
  Computed,
  Thunk,
  thunk,
} from 'easy-peasy';
import get from 'lodash/get';

// libraries
import { socialMediaHubApiClient } from '../lib/http';

// models
// import { TwitterPostInterface } from '../models/twitter';

export interface TwitterStoreInterface {
  // posts: TwitterPostInterface[];
  // setPosts: Action<TwitterStoreInterface, TwitterPostInterface[]>;
  // addPost: Action<TwitterStoreInterface, TwitterPostInterface>;
  // getPosts: Thunk<TwitterStoreInterface>;
  // postPost: Thunk<TwitterStoreInterface, TwitterPostInterface>;
  // new
  isGettingOAuthRequestToken: boolean;
  isGettingOAuthAccessToken: boolean;
  getOAuthRequestTokenError: Error | undefined;
  getOAuthAccessTokenError: Error | undefined;
  showGetOAuthRequestTokenError: boolean;
  showGetOAuthAccessTokenError: boolean;
  getOAuthRequestTokenErrorMessage: Computed<TwitterStoreInterface, string>;
  getOAuthAccessTokenErrorMessage: Computed<TwitterStoreInterface, string>;
  hasGetOAuthRequestTokenError: Computed<TwitterStoreInterface, boolean>;
  hasGetOAuthAccessTokenError: Computed<TwitterStoreInterface, boolean>;
  setIsGettingOAuthRequestToken: Action<TwitterStoreInterface, boolean>;
  setIsGettingOAuthAccessToken: Action<TwitterStoreInterface, boolean>;
  setGetOAuthRequestTokenError: Action<TwitterStoreInterface, Error | undefined>;
  setGetOAuthAccessTokenError: Action<TwitterStoreInterface, Error | undefined>;
  setShowGetOAuthRequestTokenError: Action<TwitterStoreInterface, boolean>;
  setShowGetOAuthAccessTokenError: Action<TwitterStoreInterface, boolean>;
  getOAuthRequestToken: Thunk<TwitterStoreInterface, GetOAuthRequestTokenRequestInterface>;
  getOAuthAccessToken: Thunk<TwitterStoreInterface, GetOAuthAccessTokenRequestInterface>;
}

export interface GetOAuthRequestTokenRequestInterface {
  jwt: string;
}

export interface GetOAuthAccessTokenRequestInterface {
  jwt: string;
  oAuthVerifier: string
}

export const twitterStore: TwitterStoreInterface = {
  // data
  getOAuthRequestTokenError: undefined,
  getOAuthAccessTokenError: undefined,
  isGettingOAuthRequestToken: false,
  isGettingOAuthAccessToken: false,
  showGetOAuthRequestTokenError: false,
  showGetOAuthAccessTokenError: false,
  // computed
  hasGetOAuthRequestTokenError: computed((state) => {
    return state.getOAuthRequestTokenError !== undefined;
  }),
  hasGetOAuthAccessTokenError: computed((state) => {
    return state.getOAuthAccessTokenError !== undefined;
  }),
  getOAuthRequestTokenErrorMessage: computed((state) => {
    return state.getOAuthRequestTokenError?.message || '';
  }),
  getOAuthAccessTokenErrorMessage: computed((state) => {
    return state.getOAuthAccessTokenError?.message || '';
  }),
  // actions
  setIsGettingOAuthRequestToken: action((state, isGettingOAuthRequestToken) => {
    state.isGettingOAuthRequestToken = isGettingOAuthRequestToken;
  }),
  setIsGettingOAuthAccessToken: action((state, isGettingOAuthAccessToken) => {
    state.isGettingOAuthAccessToken = isGettingOAuthAccessToken;
  }),
  setGetOAuthRequestTokenError: action((state, getOAuthRequestTokenError) => {
    state.getOAuthRequestTokenError = getOAuthRequestTokenError;
  }),
  setGetOAuthAccessTokenError: action((state, getOAuthAccessTokenError) => {
    state.getOAuthAccessTokenError = getOAuthAccessTokenError;
  }),
  setShowGetOAuthRequestTokenError: action((state, showGetOAuthRequestTokenError) => {
    state.showGetOAuthRequestTokenError = showGetOAuthRequestTokenError;
  }),
  setShowGetOAuthAccessTokenError: action((state, showGetOAuthAccessTokenError) => {
    state.showGetOAuthAccessTokenError = showGetOAuthAccessTokenError;
  }),
  getOAuthRequestToken: thunk(async (actions, getOAuthRequestTokenRequest: GetOAuthRequestTokenRequestInterface) => {
    try {
      // deconstruct request for ease
      const { jwt } = getOAuthRequestTokenRequest;
      // indicate to not show error
      actions.setShowGetOAuthRequestTokenError(false);
      // indicate we are getting oauth tokens
      actions.setIsGettingOAuthRequestToken(true);
      // clear any old errors
      actions.setGetOAuthRequestTokenError(undefined);
      // call api to get outh tokens user
      const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/graphql',
        headers: {
          'content-type': 'application/json',
          authorization: jwt,
        },
        data: {
          query: `mutation {
            twitterOAuthRequestToken
          }`,
        },
        withCredentials: true,
      });
      // validate response is okay
      if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
        throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
      }
      // indicate we are not regitering any more
      actions.setIsGettingOAuthRequestToken(false);
      // get the oauth authorize url
      const url = get(socialMediaHubApiClientResponse, 'data.data.twitterOAuthRequestToken');
      // navigate to the oauth authorize url
      window.location.replace(url);
      // return explicitly
      return;
    } catch (err) {
      // set the error in store
      actions.setGetOAuthRequestTokenError(err);
      // indicate we are not regitering any more
      actions.setIsGettingOAuthRequestToken(false);
      // indicate to show error
      actions.setShowGetOAuthRequestTokenError(true);
      // return explicitly
      return;
    }
  }),
  getOAuthAccessToken: thunk(async (actions, getOAuthAccessTokenRequest: GetOAuthAccessTokenRequestInterface) => {
    try {
      // deconstruct for ease
      const { jwt, oAuthVerifier } = getOAuthAccessTokenRequest;
      // indicate to not show error
      actions.setShowGetOAuthAccessTokenError(false);
      // indicate we are registering
      actions.setIsGettingOAuthAccessToken(true);
      // clear any old errors
      actions.setGetOAuthAccessTokenError(undefined);
      // call api to get a u user
      const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/graphql',
        headers: {
          'content-type': 'application/json',
          authorization: jwt,
        },
        data: {
          query: `mutation {
            twitterOAuthAccessToken(data: {
              oAuthVerifier: "${oAuthVerifier}"
            })
          }`,
        },
        withCredentials: true,
      });
      // validate response is okay
      if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
        throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
      }
      // indicate we are not regitering any more
      actions.setIsGettingOAuthAccessToken(false);
      // return explicitly
      return;
      //
    } catch (err) {
      // set the error in store
      actions.setGetOAuthAccessTokenError(err);
      // indicate we are not regitering any more
      actions.setIsGettingOAuthAccessToken(false);
      // indicate to show error
      actions.setShowGetOAuthAccessTokenError(true);
      // return explicitly
      return;
    }
  }),
};
