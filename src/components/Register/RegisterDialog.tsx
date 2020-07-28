// node_modules
import {
  Box,
  Checkbox, Container, FormControlLabel, FormHelperText, TextField, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { capitalize, get } from 'lodash';

// components

// styles
import { useRegisterDialogStyles } from './RegisterDialog.styles';

// form
const registartionFormSchema = Joi.object({
  emailAddress: Joi.string().trim().min(1).max(150)
    .required(),
  password: Joi.string().trim().min(1).max(150)
    .required(),
  repeatedPassword: Joi.string().trim().min(1).max(150)
    .required(),
});

/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register or other Dialogs.
 */
export function RegisterDialog(props: {
  open: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  hideBackdrop?: boolean
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  classes?: {
    dialog: { [key: string]: any; };
    dialogTitle: { [key: string]: any; };
  };
}): JSX.Element {
  // deconstruct for ease
  const {
    open,
    disableBackdropClick,
    disableEscapeKeyDown,
    hideBackdrop,
    onClose,
    classes,
  } = props;
  // styles
  const registerDialogStyles = useRegisterDialogStyles();
  // set up form
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<{ emailAddress: string; password: string; repeatedPassword: string; }>({
    resolver: joiResolver(registartionFormSchema),
  });
  // on submit for form
  const onSubmit = (data: any): void => {
    console.log(data);
    reset({
      emailAddress: '',
      password: '',
      repeatedPassword: '',
    });
  };
  console.log(classes);
  // render component
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        hideBackdrop={hideBackdrop}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Register</Typography>
            <IconButton
              className={registerDialogStyles.dialogTitleCloseButton}
              onClick={onClose}
              disabled={disableBackdropClick || disableEscapeKeyDown}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              className={registerDialogStyles.dialogContentInput}
              autoFocus
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
              autoFocus
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
              autoFocus
              autoComplete="off"
              fullWidth
              variant="outlined"
              label="Repeat Password"
              name="repeatedPassword"
              inputRef={register}
              error={!!errors.repeatedPassword}
              helperText={errors.repeatedPassword ? `${capitalize(errors.repeatedPassword.message?.replace(/"/g, ''))}.` : ''}
            />
          </form>
        </DialogContent>
        <DialogActions
          className={registerDialogStyles.dialogActions}
        >
          <Button
            className={registerDialogStyles.dialogActionsButton}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
    // <Dialog
    //   open={open}
    //   disableBackdropClick={disableBackdropClick}
    //   disableEscapeKeyDown={disableEscapeKeyDown}
    //   hideBackdrop={hideBackdrop}
    //   onClose={onClose}
    //   title="Register"
    //   classes={{
    //     dialogPaper: registerDialogStyles.dialogPaper,
    //     dialogPaperScrollPaper: registerDialogStyles.dialogPaperScrollPaper,
    //   }}
    //   body={(
    //     <form
    //       noValidate
    //       onSubmit={handleSubmit(onSubmit)}
    //       >
    //       <TextField
    //         style={{
    //           width: '400px',
    //         }}
    //         autoFocus
    //         autoComplete="off"
    //         fullWidth
    //         variant="outlined"
    //         label="Email Address"
    //         name="emailAddress"
    //         inputRef={register}
    //         error={!!errors.emailAddress}
    //         helperText={errors.emailAddress ? `${capitalize(errors.emailAddress.message?.replace(/"/g, ''))}.` : ''}
    //       />
    //       {/* <TextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         error={status === 'invalidEmail'}
    //         label="Email Address"
    //         autoFocus
    //         autoComplete="off"
    //         type="email"
    //         onChange={() => {
    //           if (status === 'invalidEmail') {
    //             setStatus(null);
    //           }
    //         }}
    //         FormHelperTextProps={{ error: true }}
    //       />
    //       <VisibilityPasswordTextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         error={
    //           status === 'passwordTooShort' || status === 'passwordsDontMatch'
    //         }
    //         label="Password"
    //         inputRef={registerPassword}
    //         autoComplete="off"
    //         onChange={() => {
    //           if (
    //             status === 'passwordTooShort'
    //             || status === 'passwordsDontMatch'
    //           ) {
    //             setStatus(null);
    //           }
    //         }}
    //         helperText={(() => {
    //           if (status === 'passwordTooShort') {
    //             return 'Create a password at least 6 characters long.';
    //           }
    //           if (status === 'passwordsDontMatch') {
    //             return 'Your passwords dont match.';
    //           }
    //           return null;
    //         })()}
    //         FormHelperTextProps={{ error: true }}
    //         isVisible={isPasswordVisible}
    //         onVisibilityChange={setIsPasswordVisible}
    //       />
    //       <VisibilityPasswordTextField
    //         variant="outlined"
    //         margin="normal"
    //         required
    //         fullWidth
    //         error={
    //           status === 'passwordTooShort' || status === 'passwordsDontMatch'
    //         }
    //         label="Repeat Password"
    //         inputRef={registerPasswordRepeat}
    //         autoComplete="off"
    //         onChange={() => {
    //           if (
    //             status === 'passwordTooShort'
    //             || status === 'passwordsDontMatch'
    //           ) {
    //             setStatus(null);
    //           }
    //         }}
    //         helperText={(() => {
    //           if (status === 'passwordTooShort') {
    //             return 'Create a password at least 6 characters long.';
    //           }
    //           if (status === 'passwordsDontMatch') {
    //             return 'Your passwords dont match.';
    //           }
    //         })()}
    //         FormHelperTextProps={{ error: true }}
    //         isVisible={isPasswordVisible}
    //         onVisibilityChange={setIsPasswordVisible}
    //       />
    //       <FormControlLabel
    //         style={{ marginRight: 0 }}
    //         control={(
    //           <Checkbox
    //             color="primary"
    //             inputRef={registerTermsCheckbox}
    //             onChange={() => {
    //               setHasTermsOfServiceError(false);
    //             }}
    //           />
    //         )}
    //         label={(
    //           <Typography variant="body1">
    //             I agree to the
    //             <span
    //               className={classes.link}
    //               onClick={isLoading ? null : openTermsDialog}
    //               tabIndex={0}
    //               role="button"
    //               onKeyDown={(event) => {
    //                 // For screenreaders listen to space and enter events
    //                 if (
    //                   (!isLoading && event.keyCode === 13)
    //                   || event.keyCode === 32
    //                 ) {
    //                   openTermsDialog();
    //                 }
    //               }}
    //             >
    //               {' '}
    //               terms of service
    //             </span>
    //           </Typography>
    //         )}
    //       />
    //       {hasTermsOfServiceError && (
    //         <FormHelperText
    //           error
    //           style={{
    //             display: 'block',
    //             marginTop: theme.spacing(-1),
    //           }}
    //         >
    //           In order to create an account, you have to accept our terms of
    //           service.
    //         </FormHelperText>
    //       )}
    //       {status === 'accountCreated' ? (
    //         <HighlightedInformation>
    //           We have created your account. Please click on the link in the
    //           email we have sent to you before logging in.
    //         </HighlightedInformation>
    //       ) : (
    //         <HighlightedInformation>
    //           Registration is disabled until we go live.
    //         </HighlightedInformation>
    //       )} */}
    //     </form>
    //   )}
    // />
  );
}
