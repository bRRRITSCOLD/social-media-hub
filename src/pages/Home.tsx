// node_modules
import React from 'react';

// components
import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';
import { useStoreState } from '../hooks/store';

const Home: React.FC = () => {
  const twitterStore = useStoreState((state) => state.twitter);
  return (
    <TwitterPostList posts={twitterStore.posts} />
  );
};

export default Home;
