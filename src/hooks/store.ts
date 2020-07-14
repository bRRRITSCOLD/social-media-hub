// node_modules
import { createTypedHooks } from 'easy-peasy';

// stores
import { StoreInterface } from '../store';

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<StoreInterface>();

// 👇 export the typed hooks

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
