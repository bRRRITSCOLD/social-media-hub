// node_modules
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

// componenets
import TwitterPostForm from '../components/Twitter/TwitterPostForm/TwitterPostForm';
// import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// styles
// import { useStoreActions, useStoreState } from '../hooks';
import { useStoreActions } from '../lib/hooks';

const Home: React.FC = ({ location }: any) => {
  // const twitterStore = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TwitterPostForm />
      <Button onClick={async () => {
        await twitterActions.getOAuthRequestToken();
        return false;
      }}>
        Connect
      </Button>
      {/* <TwitterPostList posts={twitterStore.posts} /> */}
    </>
  );
};

export default Home;
