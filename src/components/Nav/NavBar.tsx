/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
// import { DialogTitleWithCloseIcon } from '../Dialog/DialogWithCloseIcon';
// import { useFormDialogStyles } from './Dialog.styles';
import MenuIcon from '@material-ui/icons/Menu';
import { RegisterDialog, RegisterDialogFormInterface } from '../Register/RegisterDialog';
import { useStoreActions, useStoreState } from '../../lib/hooks';
/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register or other Dialogs.
 */
export function NavBar(): JSX.Element {
  // ui store specific
  const uiState = useStoreState((state) => state.ui);
  const uiActions = useStoreActions((state) => state.ui);
  // user store specific
  const userState = useStoreState((state) => state.user);
  const userActions = useStoreActions((state) => state.user);
  // render component
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
          <Button onClick={() => uiActions.setIsRegisterDialogOpen(true)} color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <RegisterDialog
        open={uiState.isRegisterDialogOpen}
        loading={userState.isRegisteringUser}
        error={userState.registerUserErrorMessage}
        onFormSubmit={async (userInformation: RegisterDialogFormInterface, formReset) => {
          await userActions.registerUser({
            ...userInformation,
          });
          formReset();
          // if (userState.hasRegisterUserError) return;
          // formReset();
        }}
        onDialogClose={() => {
          if (userState.isRegisteringUser) return;
          uiActions.setIsRegisterDialogOpen(false);
        }}
        onErrorClose={() => {
          userActions.setRegisterUserError(undefined);
        }}
      />
    </>
  );
}
