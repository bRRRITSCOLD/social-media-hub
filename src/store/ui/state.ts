export interface UIStoreStateInterface {
  isRegisterDialogOpen: boolean;
  isLoginDialogOpen: boolean;
}

export function createUIStoreState(): UIStoreStateInterface {
  return {
    isRegisterDialogOpen: false,
    isLoginDialogOpen: false,
  };
}
