// node_modules
import React from 'react';
import { Button, Dialog, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useStoreActions, useStoreState } from '../lib/hooks';

// componenets

// styles

const Dashboard: React.FC = () => {
  // render component
  const userState = useStoreState((state) => state.user);
  const twitterState = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  const onTwitterClick = async () => {
    // if we are getting an oauth request
    // token already then return and
    // allow the original request to finish
    if (twitterState.isGettingOAuthRequestToken) return;
    // call action to get oauth requst token
    await twitterActions.getOAuthRequestToken({ jwt: userState.session.jwt });
    // return explicitly
    return;
  };
  return (
    <>
      <Dialog
        scroll="body"
        open={twitterState.showGetOAuthRequestTokenError}
        onClose={() => twitterActions.setShowGetOAuthRequestTokenError(false)}
      >
        <Alert color="error">
          {twitterState.getOAuthRequestTokenErrorMessage}
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => twitterActions.setShowGetOAuthRequestTokenError(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Alert>
      </Dialog>
      <Button onClick={onTwitterClick}>
        Twitter
      </Button>
      <Button onClick={() => console.log('Facebook')}>
        Facebook
      </Button>
      <Button onClick={() => console.log('Instagram')}>
        Instagram
      </Button>
    </>
  );
};

export default Dashboard;
