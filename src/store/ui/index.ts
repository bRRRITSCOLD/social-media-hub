// thunks + actions + state
import { createUIStoreThunks, UIStoreThunksInterface } from './thunks';

export type UIStoreInterface = UIStoreThunksInterface;

export function createUIStore(): UIStoreInterface {
  // return store
  return { ...createUIStoreThunks() };
}
