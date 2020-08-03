/* eslint-disable react-hooks/exhaustive-deps */
// node_modules
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

// componenets
import TwitterPostForm from '../../components/Twitter/TwitterPostForm/TwitterPostForm';
// import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// styles
// import { useStoreActions, useStoreState } from '../hooks';
import { useStoreActions, useUrlQueryString } from '../../lib/hooks';

const TwitterOAuthCallback: React.FC = () => {
  // init hooks
  // const twitterStore = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  const urlQueryString = useUrlQueryString();
  // file constants
  const oAuthVerifier = urlQueryString.get('oauth_verifier');
  // call use effect only once (page load)
  useEffect(() => {
    twitterActions.getOAuthAccessToken({ oAuthVerifier } as { oAuthVerifier: string; });
  }, []);
  return (
    <>
      <h1>CALL BACK!</h1>
    </>
  );
};

export default TwitterOAuthCallback;
