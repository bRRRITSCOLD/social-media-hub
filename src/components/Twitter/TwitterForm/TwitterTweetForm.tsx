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
import { CardHeader } from '../../UI/Card/CardHeader';

// components

// styles
import { userTwitterTweetFormStyles } from './TwitterTweetForm.styles';

// form
export interface TwitterTweetFormInterface {
  status: string;
}

export interface TwitterTweetFormPropsInterface {
  loading?: boolean;
  form: {
    status: {
      ref?: any;
      value?: any;
      error?: { message?: string };
    };
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit?:(formData: TwitterTweetFormInterface) => void;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function TwitterTweetForm(props: TwitterTweetFormPropsInterface): JSX.Element {
  // deconstruct for ease
  const {
    loading,
    form,
    onClose,
    onSubmit,
  } = props;
  // styles
  const twitterTweetFormStyles = userTwitterTweetFormStyles();
  // render component
  return (
    <>
      <form
        noValidate
        onSubmit={onSubmit as any}
        >
        <CardHeader>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Tweet</Typography>
          </Box>
        </CardHeader>
        <DialogContent>
          <TextField
            className={twitterTweetFormStyles.dialogContentInput}
            autoComplete="off"
            fullWidth
            variant="outlined"
            label="Tweet"
            name="status"
            value={form.status.value}
            inputRef={form.status.ref}
            error={!!form.status.error}
            helperText={form.status.error?.message}
            />
        </DialogContent>
        <DialogActions
          className={twitterTweetFormStyles.dialogActions}
          >
          <Button
            color="primary"
            className={twitterTweetFormStyles.dialogActionsButton}
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            >
            Tweet
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
