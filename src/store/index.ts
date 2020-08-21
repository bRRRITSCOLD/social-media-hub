/* eslint-disable @typescript-eslint/no-unsafe-call */
// node_modules
import { createStore as easyPeasyCreateStore } from 'easy-peasy';

// stores
import { createTwitterStore, TwitterStoreInterface } from './twitter';
import { createUIStore, UIStoreInterface } from './ui';
import { createUserStore, UserStoreInterface } from './user';

export interface StoreInterface {
  twitter: TwitterStoreInterface
  ui: UIStoreInterface,
  user: UserStoreInterface
}

export function createStore() {
  return easyPeasyCreateStore<StoreInterface>({
    ui: createUIStore(),
    twitter: createTwitterStore(),
    user: createUserStore(),
  });
}
