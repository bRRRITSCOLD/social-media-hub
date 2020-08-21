// thunks + actions + state
import { createUserStoreThunks, UserStoreThunksInterface } from './thunks';

export type UserStoreInterface = UserStoreThunksInterface;

export function createUserStore(): UserStoreInterface {
  // return store
  return { ...createUserStoreThunks() };
}
