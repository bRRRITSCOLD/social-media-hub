// node_modules
import {
  action,
  Action,
  Thunk,
  thunk,
} from 'easy-peasy';
import { get } from 'lodash';
import { socialMediaHubApiClient } from '../lib/http';
// import get from 'lodash/get';

// libraries

// models

export interface UIStoreInterface {
  isRegisterDialogOpen: boolean;
  isRegisteringUser: boolean;
  setIsRegisterDialogOpen: Action<UIStoreInterface, boolean>;
  setIsRegisteringUser: Action<UIStoreInterface, boolean>;
  registerUser: Thunk<UIStoreInterface, any>;
  // addPost: Action<TwitterStoreInterface, TwitterPostInterface>;
  // getPosts: Thunk<TwitterStoreInterface>;
  // postPost: Thunk<TwitterStoreInterface, TwitterPostInterface>;
  // new
  // getOAuthRequestToken: Thunk<TwitterStoreInterface>;
  // getOAuthAccessToken: Thunk<TwitterStoreInterface, { oAuthVerifier: string }>;
}

export const uiStore: UIStoreInterface = {
  isRegisterDialogOpen: false,
  isRegisteringUser: false,
  setIsRegisterDialogOpen: action((state, isRegisterDialogOpen) => {
    state.isRegisterDialogOpen = isRegisterDialogOpen;
  }),
  setIsRegisteringUser: action((state, isRegisterDialogOpen) => {
    state.isRegisterDialogOpen = isRegisterDialogOpen;
  }),
  registerUser: thunk(async (state, post) => {
    try {
      const newPost = {
        ...post,
        createdDate: get(post, 'createdDate', new Date().toISOString()),
      };
      const postPostResponse = await socialMediaHubApiClient({
        method: 'POST',
        url: '/posts',
        headers: { 'content-type': 'application/json' },
        data: newPost,
      });
    } catch (err) {
      console.log(err);
    }
  }),
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
  // postPost: thunk(async (state, post) => {
  //   try {
  //     const newPost = {
  //       ...post,
  //       createdDate: get(post, 'createdDate', new Date().toISOString()),
  //     };
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
  // // new
  // getOAuthRequestToken: thunk(async (_state) => {
  //   try {
  //     const connectResponse = await socialMediaHubApiClient({
  //       method: 'POST',
  //       url: '/graphql',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       data: { query: '{ getOAuthRequestToken }' },
  //       withCredentials: true,
  //     });
  //     const url = get(connectResponse, 'data.data.getOAuthRequestToken');
  //     // console.log(url);
  //     window.location.replace(url);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }),
  // getOAuthAccessToken: thunk(async (_state, getOAuthAccessTokenRequest: { oAuthVerifier: string }) => {
  //   try {
  //     // deconstruct for ease
  //     const { oAuthVerifier } = getOAuthAccessTokenRequest;
  //     // call api (social-media-hub-api)
  //     const connectResponse = await socialMediaHubApiClient({
  //       method: 'POST',
  //       url: '/graphql',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       data: { query: `{ getOAuthAccessToken(oAuthVerifier: "${oAuthVerifier}") }` },
  //       withCredentials: true,
  //     });
  //     const url = get(connectResponse, 'data.data.login');
  //     window.location.replace(url);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }),
};
