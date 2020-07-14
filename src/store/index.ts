// node_modules
import { createStore } from 'easy-peasy';

// stores
import { TwitterStoreInterface, initialTwitterStoreState } from './twitter';

export interface StoreInterface {
  twitter: TwitterStoreInterface
}

const store: StoreInterface = {
  twitter: initialTwitterStoreState,
};

export default createStore<StoreInterface>(store);
