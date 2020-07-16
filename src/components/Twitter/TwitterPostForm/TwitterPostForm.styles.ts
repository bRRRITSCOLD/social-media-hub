// node_modules
import { makeStyles } from '@material-ui/core/styles';

const useTwitterPostFormStyles = makeStyles({
  formContainer: {
    margin: '1rem',
    '& .MuiTextField-root': {
      margin: '1rem 0',
    },
  },
});

export { useTwitterPostFormStyles };
