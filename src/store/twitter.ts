// node_modules
import {
  action,
  Action,
  Thunk,
  thunk,
} from 'easy-peasy';
import get from 'lodash/get';

// libraries
import { socialMediaHubApiClient } from '../lib/http';

// models
import { TwitterPostInterface } from '../models/twitter';

export interface TwitterStoreInterface {
  posts: TwitterPostInterface[];
  setPosts: Action<TwitterStoreInterface, TwitterPostInterface[]>;
  addPost: Action<TwitterStoreInterface, TwitterPostInterface>;
  getPosts: Thunk<TwitterStoreInterface>;
  postPost: Thunk<TwitterStoreInterface, TwitterPostInterface>;
}

export const initialTwitterStoreState: TwitterStoreInterface = {
  posts: [],
  setPosts: action((state, posts) => {
    state.posts = posts;
  }),
  addPost: action((state, post) => {
    state.posts.push({
      ...post,
      createdDate: get(post, 'createdDate', new Date().toISOString()),
    });
  }),
  getPosts: thunk(async (state) => {
    try {
      const getPostsResponse = await socialMediaHubApiClient({
        method: 'GET',
        url: '/posts',
      });
      state.setPosts(getPostsResponse.data);
    } catch (err) {
      console.log(err);
    }
  }),
  postPost: thunk(async (state, post) => {
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
      state.addPost(newPost);
    } catch (err) {
      console.log(err);
    }
  }),
};
