// node_modules
import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import capitalize from 'lodash/capitalize';

// styles
import { useTwitterPostFormStyles } from './TwitterPostForm.styles';
import { useStoreActions } from '../../../hooks/store';

// models

// form
const formSchema = Joi.object({
  body: Joi.string().trim().min(1).max(150)
    .required(),
});

const TwitterPostForm: React.FC<any> = () => {
  const classes = useTwitterPostFormStyles();
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<{ body: string }>({
    resolver: joiResolver(formSchema),
  });
  const addPost = useStoreActions((state) => state.twitter.addPost);
  const onSubmit = (data: any): void => {
    addPost(data);
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
