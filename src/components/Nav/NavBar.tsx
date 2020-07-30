/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import MenuIcon from '@material-ui/icons/Menu';
import * as yup from 'yup';
import { RegisterDialog, RegisterDialogFormInterface } from '../Register/RegisterDialog';
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

export function NavBar(): JSX.Element {
  // ui store specific
  const uiState = useStoreState((state) => state.ui);
  const uiActions = useStoreActions((state) => state.ui);
  // user store specific
  const userState = useStoreState((state) => state.user);
  const userActions = useStoreActions((state) => state.user);
  // forms
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<RegisterDialogFormInterface>({
    resolver: yupResolver(registerDialogFormSchema),
  });
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
        form={{
          firstName: {
            ref: register,
            error: errors.firstName,
          },
          lastName: {
            ref: register,
            error: errors.lastName,
          },
          emailAddress: {
            ref: register,
            error: errors.emailAddress,
          },
          password: {
            ref: register,
            error: errors.password,
          },
          confirmPassword: {
            ref: register,
            error: errors.confirmPassword,
          },
        }}
        onSubmit={handleSubmit(async (userInformation: RegisterDialogFormInterface) => {
          await userActions.registerUser({
            ...userInformation,
          });
          if (userState.hasRegisterUserError) return;
          reset({
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
          });
        }) as any}
        onClose={() => {
          if (userState.isRegisteringUser) return;
          uiActions.setIsRegisterDialogOpen(false);
        }}
      />
    </>
  );
}
