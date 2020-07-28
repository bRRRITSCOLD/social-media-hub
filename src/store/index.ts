// node_modules
import { createStore } from 'easy-peasy';

// stores
import { TwitterStoreInterface, twitterStore } from './twitter';
import { uiStore, UIStoreInterface } from './ui';
import { userStore, UserStoreInterface } from './user';

export interface StoreInterface {
  twitter: TwitterStoreInterface
  ui: UIStoreInterface,
  user: UserStoreInterface
}

const store: StoreInterface = {
  twitter: twitterStore,
  ui: uiStore,
  user: userStore,
};

export default createStore<StoreInterface>(store);
