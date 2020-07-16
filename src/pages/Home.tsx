// node_modules
import React from 'react';

// componenets
import TwitterPostForm from '../components/Twitter/TwitterPostForm/TwitterPostForm';
import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// styles
import { useStoreState } from '../hooks/store';

const Home: React.FC = () => {
  const twitterStore = useStoreState((state) => state.twitter);
  return (
    <>
      <TwitterPostForm />
      <TwitterPostList posts={twitterStore.posts} />
    </>
  );
};

export default Home;
