// node_modules
import { createStore as easyPeasyCreateStore } from 'easy-peasy';

// stores
import { TwitterStoreInterface, twitterStore } from './twitter';
import { uiStore, UIStoreInterface } from './ui';
import { createUserStore, UserStoreInterface } from './user';

export interface StoreInterface {
  twitter: TwitterStoreInterface
  ui: UIStoreInterface,
  user: UserStoreInterface
}

export function createStore() {
  return easyPeasyCreateStore<StoreInterface>({
    twitter: twitterStore,
    ui: uiStore,
    user: createUserStore(),
  });
}
