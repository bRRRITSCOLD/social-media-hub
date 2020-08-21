// store
import { UIStoreActionsInterface, createUIStoreActions } from './actions';

export type UIStoreThunksInterface = UIStoreActionsInterface;

export function createUIStoreThunks(): UIStoreThunksInterface {
  return { ...createUIStoreActions() };
}
