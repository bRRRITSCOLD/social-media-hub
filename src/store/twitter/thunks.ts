/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  Thunk,
  thunk,
} from 'easy-peasy';
import get from 'lodash/get';

// libraries
import { socialMediaHubApiClient } from '../../lib/http';
import { createTwitterStoreActions, TwitterStoreActionsInterface } from './actions';

export interface GetOAuthRequestTokenRequestInterface {
  jwt: string;
}

export interface GetOAuthAccessTokenRequestInterface {
  jwt: string;
  oAuthVerifier: string
}

export interface GetTwitterUserTimelineRequestInterface {
  jwt: string;
  getCriteria: {
    twitterUserId?: string;
    twitterScreenName?: string;
    sinceId?: string;
    maxId?: string;
    count?: number;
    trimUser?: string;
    excludeReplies?: string;
    includeRts?: string;
  };
}

export interface TwitterStoreThunksInterface extends TwitterStoreActionsInterface {
  getOAuthRequestToken: Thunk<TwitterStoreThunksInterface, GetOAuthRequestTokenRequestInterface>;
  getOAuthAccessToken: Thunk<TwitterStoreThunksInterface, GetOAuthAccessTokenRequestInterface>;
  getUserTimeline: Thunk<TwitterStoreThunksInterface, GetTwitterUserTimelineRequestInterface>;
}

export function createTwitterStoreThunks(): TwitterStoreThunksInterface {
  return {
    ...createTwitterStoreActions(),
    getOAuthRequestToken: thunk(async (actions, getOAuthRequestTokenRequest: GetOAuthRequestTokenRequestInterface) => {
      try {
      // deconstruct request for ease
        const { jwt } = getOAuthRequestTokenRequest;
        // indicate to not show error
        actions.setShowGetOAuthRequestTokenError(false);
        // indicate we are getting oauth tokens
        actions.setIsGettingOAuthRequestToken(true);
        // clear any old errors
        actions.setGetOAuthRequestTokenError(undefined);
        // call api to get outh tokens user
        const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
          method: 'POST',
          url: '/graphql',
          headers: {
            'content-type': 'application/json',
            authorization: jwt,
          },
          data: {
            query: `mutation {
            twitterOAuthRequestToken
          }`,
          },
          withCredentials: true,
        });
        // validate response is okay
        if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
          throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
        }
        // indicate we are not regitering any more
        actions.setIsGettingOAuthRequestToken(false);
        // get the oauth authorize url
        const url = get(socialMediaHubApiClientResponse, 'data.data.twitterOAuthRequestToken');
        // navigate to the oauth authorize url
        window.location.replace(url);
        // return explicitly
        return;
      } catch (err) {
      // set the error in store
        actions.setGetOAuthRequestTokenError(err);
        // indicate we are not regitering any more
        actions.setIsGettingOAuthRequestToken(false);
        // indicate to show error
        actions.setShowGetOAuthRequestTokenError(true);
        // return explicitly
        return;
      }
    }),
    getOAuthAccessToken: thunk(async (actions, getOAuthAccessTokenRequest: GetOAuthAccessTokenRequestInterface) => {
      try {
      // deconstruct for ease
        const { jwt, oAuthVerifier } = getOAuthAccessTokenRequest;
        // indicate to not show error
        actions.setShowGetOAuthAccessTokenError(false);
        // indicate we are registering
        actions.setIsGettingOAuthAccessToken(true);
        // clear any old errors
        actions.setGetOAuthAccessTokenError(undefined);
        // call api to get a u user
        const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
          method: 'POST',
          url: '/graphql',
          headers: {
            'content-type': 'application/json',
            authorization: jwt,
          },
          data: {
            query: `mutation {
            twitterOAuthAccessToken(data: {
              oAuthVerifier: "${oAuthVerifier}"
            })
          }`,
          },
          withCredentials: true,
        });
        // validate response is okay
        if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
          throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
        }
        // indicate we are not regitering any more
        actions.setIsGettingOAuthAccessToken(false);
        // return explicitly
        return;
      //
      } catch (err) {
      // set the error in store
        actions.setGetOAuthAccessTokenError(err);
        // indicate we are not regitering any more
        actions.setIsGettingOAuthAccessToken(false);
        // indicate to show error
        actions.setShowGetOAuthAccessTokenError(true);
        // return explicitly
        return;
      }
    }),
    getUserTimeline: thunk(async (actions, getUserTimelineRequest: GetTwitterUserTimelineRequestInterface) => {
      try {
      // deconstruct for ease
        const { jwt, getCriteria } = getUserTimelineRequest;
        // indicate to not show error
        actions.setShowGetUserTimelineError(false);
        // indicate we are registering
        actions.setIsGettingUserTimeline(true);
        // clear any old errors
        actions.setGetUserTimelineError(undefined);
        /* eslint-disable @typescript-eslint/indent */
      // create query
      const query = `{
        twitterUserTimeline(${Object.keys(getCriteria).map((key: string) => {
          let value;
          if (typeof (getCriteria as any)[key] === 'string') {
            value = `${key}: "${(getCriteria as any)[key]}"`;
          } else {
            value = `${key}: ${(getCriteria as any)[key]}`;
          }
          return value;
        }).join(', ')}) {
          createdAt,
          text,
          source,
          user {
            name,
            screenName
          }
        }
      }`;
      /* eslint-enable @typescript-eslint/indent */
        // call api to get a u user
        const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
          method: 'POST',
          url: '/graphql',
          headers: {
            'content-type': 'application/json',
            authorization: jwt,
          },
          data: {
            query,
          },
          withCredentials: true,
        });
        // validate response is okay
        if (socialMediaHubApiClientResponse.status !== 200) {
        // build and throw error
          throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
        }
        // store the user timeline
        actions.setUserTimeline(socialMediaHubApiClientResponse.data.data.twitterUserTimeline);
        // indicate we are not regitering any more
        actions.setIsGettingUserTimeline(false);
        // return explicitly
        return;
      } catch (err) {
      // set the error in store
        actions.setGetUserTimelineError(err);
        // indicate we are not regitering any more
        actions.setIsGettingUserTimeline(false);
        // indicate to show error
        actions.setShowGetUserTimelineError(true);
        // return explicitly
        return;
      }
    }),

  };
}
