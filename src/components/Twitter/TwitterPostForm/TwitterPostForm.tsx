// node_modules
import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import capitalize from 'lodash/capitalize';

// styles
import { useTwitterPostFormStyles } from './TwitterPostForm.styles';

// hooks
// import { useStoreActions } from '../../../lib/hooks';

// models

const TwitterPostForm: React.FC<any> = () => {
  const classes = useTwitterPostFormStyles();
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<{ body: string }>();
  // const twitterActions = useStoreActions((state) => state.twitter);
  const onSubmit = (_data: any): void => {
    // await twitterActions.postPost(data);
    reset({
      body: '',
    });
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={classes.formContainer}
    >
      <TextField
        fullWidth
        multiline
        rowsMax={10}
        rows={3}
        variant="outlined"
        label="Body"
        name="body"
        inputRef={register}
        error={!!errors.body}
        helperText={errors.body ? `${capitalize(errors.body.message?.replace(/"/g, ''))}.` : ''}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" color="primary" variant="contained">Post</Button>
      </Box>
    </form>
  );
};

export default TwitterPostForm;
