// node_modules
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

// styles
import { get } from 'lodash';
// import { useTwitterTimelinesStyles } from './TwitterTimelines.styles';

// libraries
import { useStoreActions, useStoreState } from '../../lib/hooks';

// components
import { CustomTabsCard } from '../UI/Card/CustomTabsCard';
import { TwitterUserTimeline } from './TwitterUserTimeline';
import { TwitterHomeTimeline } from './TwitterHomeTimeline';
import { TwitterMentionsTimeline } from './TwitterMentionsTimeline';

export function TwitterTimelines(): JSX.Element {
  // user store specific
  const userState = useStoreState((state) => state.user);
  // twitter store specific
  const twitterState = useStoreState((state) => state.twitter);
  const twitterActions = useStoreActions((state) => state.twitter);
  // local handlers
  const onTwitterAuthenticateClick = async () => {
    // if we are getting an oauth request
    // token already then return and
    // allow the original request to finish
    if (twitterState.isGettingOAuthRequestToken) return;
    // call action to get oauth requst token
    await twitterActions.getOAuthRequestToken({ jwt: userState.session.jwt });
    // return explicitly
    return;
  };
  const onUseEffect = async () => {
    // initiate holder for async tasks
    const asyncTasks: any[] = [];
    // if we are an authenticated twitter user
    // then we call twitter to get
    // the user timeline (default timeline)
    // and retrieve as many objects as possible
    if (
      userState.isAuthenticatedWithTwitter
      && !twitterState.isGettingUserTimeline
    ) asyncTasks.push(twitterActions.getUserTimeline({
      jwt: userState.session.jwt,
      getCriteria: {
        twitterScreenName: get(userState, 'decodedJWT.twitterScreenName'),
        count: 100,
      },
    }));
    // now await all async tasks
    await Promise.all(asyncTasks);
  };
  // call use effect only once (page load)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onUseEffect();
  }, []);
  return (
    <CustomTabsCard
      title="Twitter"
      tabs={[
        {
          name: 'User',
          icon: PersonIcon,
          content: (
            <TwitterUserTimeline
              timelineLoading={twitterState.isGettingUserTimeline}
              tweets={twitterState.session.userTimeline}
              isAuthenticated={userState.isAuthenticatedWithTwitter}
              onClickAuthenticate={onTwitterAuthenticateClick}
            />
          ),
        },
        {
          name: 'Home',
          icon: HomeIcon,
          content: (
            <TwitterHomeTimeline
              timelineLoading={twitterState.isGettingUserTimeline}
              tweets={twitterState.session.userTimeline}
              isAuthenticated={userState.isAuthenticatedWithTwitter}
              onClickAuthenticate={onTwitterAuthenticateClick}
            />
          ),
        },
        {
          name: 'Mentions',
          icon: AlternateEmailIcon,
          content: (
            <TwitterMentionsTimeline
              timelineLoading={twitterState.isGettingUserTimeline}
              tweets={twitterState.session.userTimeline}
              isAuthenticated={userState.isAuthenticatedWithTwitter}
              onClickAuthenticate={onTwitterAuthenticateClick}
            />
          ),
        },
      ]}
    />
  );
}
