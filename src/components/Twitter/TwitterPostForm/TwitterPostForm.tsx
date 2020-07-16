import { TextField } from '@material-ui/core';
// node_modules
import React from 'react';

// styles
import { useTwitterPostFormStyles } from './TwitterPostForm.styles';

// models

const TwitterPostForm: React.FC<any> = () => {
  const classes = useTwitterPostFormStyles();
  return (
    <form noValidate className={classes.formContainer}>
      <TextField
        label="Body"
        fullWidth
        multiline
        rowsMax={10}
        rows={3}
        variant="outlined"
      />
    </form>
  );
};

export default TwitterPostForm;
