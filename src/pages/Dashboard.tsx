// node_modules
import React from 'react';
import { Button } from '@material-ui/core';
import { useStoreActions } from '../lib/hooks';

// componenets

// styles

const Dashboard: React.FC = () => {
  // render component
  // const twitterStore = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  const onTwitterClick = async () => {
    //
    await twitterActions.getOAuthRequestToken();
    return false;
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
