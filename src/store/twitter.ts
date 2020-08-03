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
import { TwitterPostInterface } from '../models/twitter';

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
  getOAuthRequestTokenErrorMessage: Computed<TwitterStoreInterface, string>;
  getOAuthAccessTokenErrorMessage: Computed<TwitterStoreInterface, string>;
  hasGetOAuthRequestTokenError: Computed<TwitterStoreInterface, boolean>;
  hasGetOAuthAccessTokenError: Computed<TwitterStoreInterface, boolean>;
  setIsGettingOAuthRequestToken: Action<TwitterStoreInterface, boolean>;
  setIsGettingOAuthAccessToken: Action<TwitterStoreInterface, boolean>;
  setGetOAuthRequestTokenError: Action<TwitterStoreInterface, Error | undefined>;
  setGetOAuthAccessTokenError: Action<TwitterStoreInterface, Error | undefined>;
  getOAuthRequestToken: Thunk<TwitterStoreInterface, GetOAuthRequestTokenRequestInterface>;
  getOAuthAccessToken: Thunk<TwitterStoreInterface, GetOAuthRequestTokenRequestInterface>;
}

export interface GetOAuthRequestTokenRequestInterface {
  jwt: string;
}

export interface GetOAuthAccessTokenRequestInterface {
  jwt: string;
  oAuthVerifier: string
}

export const twitterStore: TwitterStoreInterface = {
  // posts: [],
  // setPosts: action((state, posts) => {
  //   state.posts = posts;
  // }),
  // addPost: action((state, post) => {
  //   state.posts.push({
  //     ...post,
  //     createdDate: get(post, 'createdDate', new Date().toISOString()),
  //   });
  // }),
  // getPosts: thunk(async (state) => {
  //   try {
  //     const getPostsResponse = await socialMediaHubApiClient({
  //       method: 'GET',
  //       url: '/posts',
  //     });
  //     state.setPosts(getPostsResponse.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }),
  // postPost: thunk(async (actions, post) => {
  //   try {
  //     const newPost = {
  //       ...post,
  //       createdDate: get(post, 'createdDate', new Date().toISOString()),
  //     };
  //     // indicate we are registering
  //     actions.set(true);
  //     // clear any old errors
  //     actions.setRegisterUserError(undefined);
  //     // call api to register user
  //     const postPostResponse = await socialMediaHubApiClient({
  //       method: 'POST',
  //       url: '/posts',
  //       headers: { 'content-type': 'application/json' },
  //       data: newPost,
  //     });
  //     state.addPost(newPost);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }),
  // new
  getOAuthRequestTokenError: undefined,
  getOAuthAccessTokenError: undefined,
  isGettingOAuthReqeustToken: false,
  isGettingOAuthAccessToken: false,
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
  getOAuthRequestToken: thunk(async (actions, getOAuthRequestTokenRequest: GetOAuthRequestTokenRequestInterface) => {
    try {
      // deconstruct request for ease
      const { jwt } = getOAuthRequestTokenRequest;
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
        data: { query: '{ getOAuthRequestToken }' },
        withCredentials: true,
      });
      // validate response is okay
      if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
        throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
      }
      // indicate we are not regitering any more
      actions.setIsGettingOAuthRequestToken(false);
      const url = get(getOAuthRequestTokenResponse, 'data.data.getOAuthRequestToken');
      // console.log(url);
      window.location.replace(url);
    } catch (err) {
      // set the error in store
      actions.setGetOAuthRequestTokenError(err);
      // indicate we are not regitering any more
      actions.setIsGettingOAuthRequestToken(false);
      // return explicitly
      return;
    }
  }),
  getOAuthAccessToken: thunk(async (_state, getOAuthAccessTokenRequest: GetOAuthAccessTokenRequestInterface) => {
    try {
      // deconstruct for ease
      const { jwt, oAuthVerifier } = getOAuthAccessTokenRequest;
      // indicate we are registering
      actions.setIsRegisteringUser(true);
      // clear any old errors
      actions.setRegisterUserError(undefined);
      // call api to get a u user
      const connectResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/graphql',
        headers: {
          'content-type': 'application/json',
          authorization: jwt,
        },
        data: { query: `{ getOAuthAccessToken(oAuthVerifier: "${oAuthVerifier}") }` },
        withCredentials: true,
      });
      const url = get(connectResponse, 'data.data.login');
      window.location.replace(url);
    } catch (err) {
      console.log(err);
    }
  }),
};
