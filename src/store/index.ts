// node_modules
import { createStore } from 'easy-peasy';

// stores
import { TwitterStoreInterface, twitterStore } from './twitter';

export interface StoreInterface {
  twitter: TwitterStoreInterface
}

const store: StoreInterface = {
  twitter: twitterStore,
};

export default createStore<StoreInterface>(store);
