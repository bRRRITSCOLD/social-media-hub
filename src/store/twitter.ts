// node_modules
import {
  action,
  Action,
  Thunk,
  thunk,
} from 'easy-peasy';

// libraries
import { socialMediaHubApiClient } from '../lib/http';

// models
import { TwitterPostInterface } from '../models/twitter';

export interface TwitterStoreInterface {
  posts: TwitterPostInterface[];
  setPosts: Action<TwitterStoreInterface, TwitterPostInterface[]>;
  addPost: Action<TwitterStoreInterface, TwitterPostInterface>;
  getPosts: Thunk<TwitterStoreInterface>;
}

export const initialTwitterStoreState: TwitterStoreInterface = {
  posts: [],
  setPosts: action((state, posts) => {
    state.posts = posts;
  }),
  addPost: action((state, post) => {
    state.posts.push({
      ...post,
      createdDate: new Date().toISOString(),
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
};
