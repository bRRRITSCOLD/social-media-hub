/* eslint-disable react-hooks/exhaustive-deps */
// node_modules
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

// componenets
import TwitterPostForm from '../../components/Twitter/TwitterPostForm/TwitterPostForm';
// import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// styles
// import { useStoreActions, useStoreState } from '../hooks';
import { useStoreActions, useStoreState, useUrlQueryString } from '../../lib/hooks';

const TwitterOAuthCallback: React.FC = () => {
  // init hooks
  const userState = useStoreState((state) => state.user);
  const userActions = useStoreActions((state) => state.user);
  const twitterActions = useStoreActions((state) => state.twitter);
  const urlQueryString = useUrlQueryString();
  // file constants
  const oAuthVerifier = urlQueryString.get('oauth_verifier');
  // funcs
  const onUseEffect = async () => {
    await twitterActions.getOAuthAccessToken({
      jwt: userState.session.jwt,
      oAuthVerifier: oAuthVerifier as string,
    });
    // now we must refresh jwt token as
    // to get correct roles now that we
    // completed oauth access to twitter
    await userActions.refreshUserJwt({
      jwt: userState.session.jwt,
      jwtRefreshToken: userState.session.jwtRefreshToken,
    });
    // now direct the user back to the dashboard
    window.location.replace('/dashboard');
  };
  // call use effect only once (page load)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onUseEffect();
  }, []);
  return (
    <>
      <h1>CALL BACK!</h1>
    </>
  );
};

export default TwitterOAuthCallback;
