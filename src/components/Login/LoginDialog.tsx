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
import { useLoginDialogStyles } from './LoginDialog.styles';

// form
export interface LoginDialogFormInterface {
  emailAddress: string;
  password: string;
}

export interface LoginDialogPropsInterface {
  open: boolean;
  loading?: boolean
  form: {
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
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit?:(formData: LoginDialogFormInterface) => void;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function LoginDialog(props: LoginDialogPropsInterface): JSX.Element {
  // deconstruct for ease
  const {
    open,
    loading,
    form,
    onClose,
    onSubmit,
  } = props;
  // styles
  const loginDialogStyles = useLoginDialogStyles();
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
              <Typography variant="h5">Login</Typography>
              <IconButton
                className={loginDialogStyles.dialogTitleCloseButton}
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
              className={loginDialogStyles.dialogContentInput}
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
              className={loginDialogStyles.dialogContentInput}
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
          </DialogContent>
          <DialogActions
            className={loginDialogStyles.dialogActions}
          >
            <Button
              color="primary"
              className={loginDialogStyles.dialogActionsButton}
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
