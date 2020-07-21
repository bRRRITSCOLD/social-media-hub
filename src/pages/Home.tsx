// node_modules
import React, { useEffect } from 'react';

// componenets
import TwitterPostForm from '../components/Twitter/TwitterPostForm/TwitterPostForm';
import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// styles
import { useStoreActions, useStoreState } from '../hooks/store';

const Home: React.FC = () => {
  const twitterStore = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  useEffect(() => {
    twitterActions.getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TwitterPostForm />
      <TwitterPostList posts={twitterStore.posts} />
    </>
  );
};

export default Home;
