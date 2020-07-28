// node_modules
import { makeStyles } from '@material-ui/core/styles';

const useRegisterDialogStyles = makeStyles((theme) => ({
  dialogTitleCloseButton: {
    marginRight: -12,
    marginTop: -10,
  },
  dialogContentInput: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  dialogActions: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  dialogActionsButton: {
    width: '100%',
  },
}));

export { useRegisterDialogStyles };
