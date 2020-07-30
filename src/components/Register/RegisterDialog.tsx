/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// node_modules
import {
  Box,
  TextField, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { capitalize } from 'lodash';
import * as yup from 'yup';

// components

// styles
import { useRegisterDialogStyles } from './RegisterDialog.styles';
import { useStoreActions, useStoreState } from '../../lib/hooks';

// form
export interface RegisterDialogFormInterface {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

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

export interface RegisterDialogPropsInterface {
  open: boolean;
  loading?: boolean
  error?: string;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  hideBackdrop?: boolean
  onDialogClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onFormSubmit?:(formData: RegisterDialogFormInterface, formReset: Function) => void;
  onErrorClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register or other Dialogs.
 */
export function RegisterDialog(props: RegisterDialogPropsInterface): JSX.Element {
  // deconstruct for ease
  const {
    open,
    loading,
    error,
    disableBackdropClick,
    disableEscapeKeyDown,
    onDialogClose,
    onFormSubmit,
    onErrorClose,
  } = props;
  // styles
  const registerDialogStyles = useRegisterDialogStyles();
  // set up form
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<RegisterDialogFormInterface>({
    resolver: yupResolver(registerDialogFormSchema),
  });
  // handle form submit
  const onSubmit = async (data: any) => {
    // call user provided on submit func
    await (onFormSubmit as any)(data, reset.bind({
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
    }));
    // return explicitly
    return;
  };
  // render component
  return (
    <>
      <Dialog
        scroll="body"
        open={open}
        onClose={onDialogClose}
        disableBackdropClick={loading}
        disableEscapeKeyDown={loading}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <Dialog
          scroll="body"
          open={error && error !== '' ? error as any : false}
          onClose={onErrorClose}
          PaperComponent={Alert as any}
          PaperProps={{
            color: 'error',
            action: (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onErrorClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            ),
          } as any}
        >
          {error}
        </Dialog>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Register</Typography>
              <IconButton
                className={registerDialogStyles.dialogTitleCloseButton}
                onClick={onDialogClose}
                disabled={disableBackdropClick || disableEscapeKeyDown}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoFocus
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="First Name"
              name="firstName"
              inputRef={register}
              error={!!errors.firstName}
              helperText={errors.firstName ? `${capitalize(errors.firstName.message?.replace(/"/g, ''))}.` : ''}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Last Name"
              name="lastName"
              inputRef={register}
              error={!!errors.lastName}
              helperText={errors.lastName ? `${capitalize(errors.lastName.message?.replace(/"/g, ''))}.` : ''}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Email Address"
              name="emailAddress"
              inputRef={register}
              error={!!errors.emailAddress}
              helperText={errors.emailAddress ? `${capitalize(errors.emailAddress.message?.replace(/"/g, ''))}.` : ''}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              inputRef={register}
              error={!!errors.password}
              helperText={errors.password ? `${capitalize(errors.password.message?.replace(/"/g, ''))}.` : ''}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              inputRef={register}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? `${capitalize(errors.confirmPassword.message?.replace(/"/g, ''))}.` : ''}
            />
          </DialogContent>
          <DialogActions
            className={registerDialogStyles.dialogActions}
          >
            <Button
              color="primary"
              className={registerDialogStyles.dialogActionsButton}
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
            >
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
