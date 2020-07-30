/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// node_modules
import {
  Box,
  TextField, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Collapse,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

// components

// styles
import { useRegisterDialogStyles } from './RegisterDialog.styles';

// form
export interface RegisterDialogFormInterface {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterDialogPropsInterface {
  open: boolean;
  loading?: boolean
  form: {
    firstName: {
      ref?: any;
      value?: any;
      error?: { message?: string };
    };
    lastName: {
      ref?: any;
      value?: any;
      error?: { message?: string };
    };
    emailAddress: {
      ref?: any;
      value?: any;
      error?: { message?: string };
    };
    password: {
      ref?: any;
      value?: any;
      error?: { message?: string };
    };
    confirmPassword: {
      ref?: any;
      value?: any;
      error?: { message?: string };
    };
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit?:(formData: RegisterDialogFormInterface) => void;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
    form,
    onClose,
    onSubmit,
  } = props;
  // styles
  const registerDialogStyles = useRegisterDialogStyles();
  // render component
  return (
    <>
      <Dialog
        scroll="body"
        open={open}
        onClose={onClose}
        disableBackdropClick={loading}
        disableEscapeKeyDown={loading}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <form
          noValidate
          onSubmit={onSubmit as any}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Register</Typography>
              <IconButton
                className={registerDialogStyles.dialogTitleCloseButton}
                onClick={onClose}
                disabled={loading}
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
              value={form.firstName.value}
              inputRef={form.firstName.ref}
              error={!!form.firstName.error}
              helperText={form.firstName.error?.message}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={form.lastName.value}
              inputRef={form.lastName.ref}
              error={!!form.lastName.error}
              helperText={form.lastName.error?.message}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Email Address"
              name="emailAddress"
              value={form.emailAddress.value}
              inputRef={form.emailAddress.ref}
              error={!!form.emailAddress.error}
              helperText={form.emailAddress.error?.message}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              value={form.password.value}
              inputRef={form.password.ref}
              error={!!form.password.error}
              helperText={form.password.error?.message}
            />
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword.value}
              inputRef={form.confirmPassword.ref}
              error={!!form.confirmPassword.error}
              helperText={form.confirmPassword.error?.message}
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
