/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  AppBar, Button, IconButton, Toolbar, Dialog,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import MenuIcon from '@material-ui/icons/Menu';
import * as yup from 'yup';

// components
import { RegisterDialog, RegisterDialogFormInterface } from '../Register/RegisterDialog';
import { LoginDialog, LoginDialogFormInterface } from '../Login/LoginDialog';

// libraries
import { useStoreActions, useStoreState } from '../../lib/hooks';

const registerDialogFormSchema: yup.ObjectSchema<RegisterDialogFormInterface | undefined> = yup.object().shape({
  firstName: yup
    .string()
    .label('First Name')
    .required(),
  lastName: yup
    .string()
    .label('Last Name')
    .required(),
  emailAddress: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2)
    .max(16),
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match.', function (value) {
      return this.parent.password === value;
    }),
});

const loginDialogFormSchema: yup.ObjectSchema<LoginDialogFormInterface | undefined> = yup.object().shape({
  emailAddress: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2)
    .max(16),
});

export function NavBar(): JSX.Element {
  // ui store specific
  const uiState = useStoreState((state) => state.ui);
  const uiActions = useStoreActions((state) => state.ui);
  // user store specific
  const userState = useStoreState((state) => state.user);
  const userActions = useStoreActions((state) => state.user);
  // register form
  const {
    register: registerFormRegister,
    handleSubmit: registerFormHandleSubmit,
    errors: registerFormErrors,
    reset: registerFormReset,
  } = useForm<RegisterDialogFormInterface>({
    resolver: yupResolver(registerDialogFormSchema),
  });
  // login form
  const {
    register: loginFormRegister,
    handleSubmit: loginFormHandleSubmit,
    errors: loginFormErrors,
    reset: loginFormReset,
  } = useForm<LoginDialogFormInterface>({
    resolver: yupResolver(loginDialogFormSchema),
  });
  // render component
  return (
    <>
      <Dialog
        scroll="body"
        open={userState.hasRegisterUserError}
        onClose={() => userActions.setRegisterUserError(undefined)}
      >
        <Alert color="error">
          {userState.registerUserErrorMessage}
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => userActions.setRegisterUserError(undefined)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Alert>
      </Dialog>
      <Dialog
        scroll="body"
        open={userState.hasLoginUserError}
        onClose={() => userActions.setLoginUserError(undefined)}
      >
        <Alert color="error">
          {userState.loginUserErrorMessage}
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => userActions.setLoginUserError(undefined)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Alert>
      </Dialog>
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
          <Button
            onClick={() => {
              // open the register dialog
              uiActions.setIsRegisterDialogOpen(true);
            }}
            color="inherit">
            Register
          </Button>
          <Button
            onClick={() => {
              // open the register dialog
              uiActions.setIsLoginDialogOpen(true);
            }}
            color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <RegisterDialog
        open={uiState.isRegisterDialogOpen}
        loading={userState.isRegisteringUser}
        form={{
          firstName: {
            ref: registerFormRegister,
            error: registerFormErrors.firstName,
          },
          lastName: {
            ref: registerFormRegister,
            error: registerFormErrors.lastName,
          },
          emailAddress: {
            ref: registerFormRegister,
            error: registerFormErrors.emailAddress,
          },
          password: {
            ref: registerFormRegister,
            error: registerFormErrors.password,
          },
          confirmPassword: {
            ref: registerFormRegister,
            error: registerFormErrors.confirmPassword,
          },
        }}
        onSubmit={registerFormHandleSubmit(async (registerDialogForm: RegisterDialogFormInterface) => {
          // call api to register use
          await userActions.registerUser({
            ...registerDialogForm,
          });
          // if there is an error after
          // trying to register user then
          // return now
          if (userState.hasRegisterUserError) return;
          // reset form if registration was successful
          registerFormReset({
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
          });
          // close the register dialog since
          // registration was successful
          uiActions.setIsRegisterDialogOpen(false);
        }) as any}
        onClose={() => {
          // if we are rgistering a user
          // do not allow closing of the dialog
          if (userState.isRegisteringUser) return;
          // close dialog if we are not reisgtering a user
          uiActions.setIsRegisterDialogOpen(false);
        }}
      />
      <LoginDialog
        open={uiState.isLoginDialogOpen}
        loading={userState.isLoggingInUser}
        form={{
          emailAddress: {
            ref: loginFormRegister,
            error: loginFormErrors.emailAddress,
          },
          password: {
            ref: loginFormRegister,
            error: loginFormErrors.password,
          },
        }}
        onSubmit={loginFormHandleSubmit(async (loginDialogForm: LoginDialogFormInterface) => {
          // call api to register use
          await userActions.loginUser({
            ...loginDialogForm,
          });
          // if there is an error after
          // trying to register user then
          // return now
          if (userState.hasLoginUserError) return;
          // reset form if registration was successful
          loginFormReset({
            emailAddress: '',
            password: '',
          });
          // close the register dialog since
          // registration was successful
          uiActions.setIsLoginDialogOpen(false);
        }) as any}
        onClose={() => {
          // if we are rgistering a user
          // do not allow closing of the dialog
          if (userState.isRegisteringUser) return;
          // close dialog if we are not reisgtering a user
          uiActions.setIsLoginDialogOpen(false);
        }}
      />
    </>
  );
}
