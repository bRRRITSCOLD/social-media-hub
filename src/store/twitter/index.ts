// thunks + actions + state
import { createTwitterStoreThunks, TwitterStoreThunksInterface } from './thunks';

export type TwitterStoreInterface = TwitterStoreThunksInterface;

export function createTwitterStore(): TwitterStoreInterface {
  // return store
  return { ...createTwitterStoreThunks() };
}
