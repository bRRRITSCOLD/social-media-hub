import { TwitterPostInterface } from '../models/twitter';

export interface TwitterStoreInterface {
  posts: TwitterPostInterface[]
}

export const initialTwitterStoreState: TwitterStoreInterface = {
  posts: [
    {
      body: 'Hello Word',
      createdDate: new Date(),
    },
  ],
};
