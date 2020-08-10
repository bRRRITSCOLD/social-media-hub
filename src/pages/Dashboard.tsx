// node_modules
import React from 'react';
import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from '../lib/hooks';

// componenets

// styles

const Dashboard: React.FC = () => {
  // render component
  const userState = useStoreState((state) => state.user);
  const twitterActions = useStoreActions((state) => state.twitter);
  const onTwitterClick = async () => {
    //
    await twitterActions.getOAuthRequestToken({ jwt: userState.session.jwt });
    return true;
  };
  return (
    <>
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
