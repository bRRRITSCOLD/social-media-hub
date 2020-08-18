// node_modules
import { makeStyles } from '@material-ui/core/styles';

// libraries
import { css } from '../../../lib/utils';

const useCardHeaderStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important' as any,
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
    },
  },
  cardTitle: {
    color: '#3C4858',
    textDecoration: 'none',
    fontWeight: '300' as any,
    marginTop: '0',
    marginBottom: '3px',
    minHeight: 'auto',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1',
    },
  },

  // cardPlain: {
  //   background: 'transparent',
  //   boxShadow: 'none',
  // },
  // cardProfile: {
  //   marginTop: '30px',
  //   textAlign: 'center',
  // },
  // cardChart: {
  //   '& p': {
  //     marginTop: '0px',
  //     paddingTop: '0px',
  //   },
  // },
}));

export { useCardHeaderStyles };
