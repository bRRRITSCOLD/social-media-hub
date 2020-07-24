/* eslint-disable react-hooks/exhaustive-deps */
// node_modules
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

// componenets
import TwitterPostForm from '../../components/Twitter/TwitterPostForm/TwitterPostForm';
// import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// styles
// import { useStoreActions, useStoreState } from '../hooks/store';
import { useStoreActions } from '../../hooks/store';

const TwitterOAuthCallback: React.FC = ({ location }: any) => {
  // const twitterStore = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  useEffect(() => {
    console.log('callback useEffect');
    console.log(location);
    console.log(window.location.href);
    twitterActions.getOAuthAccessToken();
  }, []);
  return (
    <>
      <h1>CALL BACK!</h1>
    </>
  );
};

export default TwitterOAuthCallback;
