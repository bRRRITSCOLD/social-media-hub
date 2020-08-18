/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  action,
  Action,
  computed,
  Computed,
  persist,
  Thunk,
  thunk,
} from 'easy-peasy';
import get from 'lodash/get';

// libraries
import { socialMediaHubApiClient } from '../lib/http';

// models
// import { TwitterPostInterface } from '../models/twitter';

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

export interface TwitterStoreInterface {
  // persisted session data
  session: {
    userTimeline: any[];
  }
  // static/value stores
  isGettingOAuthRequestToken: boolean;
  isGettingOAuthAccessToken: boolean;
  isGettingUserTimeline: boolean;

  getOAuthRequestTokenError: Error | undefined;
  getOAuthAccessTokenError: Error | undefined;
  getUserTimelineError: Error | undefined;

  showGetOAuthRequestTokenError: boolean;
  showGetOAuthAccessTokenError: boolean;
  showGetUserTimelineError: boolean;
  // computed
  hasUserTimeline: Computed<TwitterStoreInterface, boolean>;

  getOAuthRequestTokenErrorMessage: Computed<TwitterStoreInterface, string>;
  getOAuthAccessTokenErrorMessage: Computed<TwitterStoreInterface, string>;
  getUserTimelineErrorMessage: Computed<TwitterStoreInterface, string>;

  hasGetOAuthRequestTokenError: Computed<TwitterStoreInterface, boolean>;
  hasGetOAuthAccessTokenError: Computed<TwitterStoreInterface, boolean>;
  hasGetUserTimelineError: Computed<TwitterStoreInterface, boolean>;
  // actions
  setUserTimeline: Action<TwitterStoreInterface, any[]>;

  setIsGettingOAuthRequestToken: Action<TwitterStoreInterface, boolean>;
  setIsGettingOAuthAccessToken: Action<TwitterStoreInterface, boolean>;
  setIsGettingUserTimeline: Action<TwitterStoreInterface, boolean>;

  setGetOAuthRequestTokenError: Action<TwitterStoreInterface, Error | undefined>;
  setGetOAuthAccessTokenError: Action<TwitterStoreInterface, Error | undefined>;
  setGetUserTimelineError: Action<TwitterStoreInterface, Error | undefined>;

  setShowGetOAuthRequestTokenError: Action<TwitterStoreInterface, boolean>;
  setShowGetOAuthAccessTokenError: Action<TwitterStoreInterface, boolean>;
  setShowGetUserTimelineError: Action<TwitterStoreInterface, boolean>;
  // thunk
  getOAuthRequestToken: Thunk<TwitterStoreInterface, GetOAuthRequestTokenRequestInterface>;
  getOAuthAccessToken: Thunk<TwitterStoreInterface, GetOAuthAccessTokenRequestInterface>;
  getUserTimeline: Thunk<TwitterStoreInterface, GetTwitterUserTimelineRequestInterface>;
}

export const twitterStore: TwitterStoreInterface = {
  session: persist({
    userTimeline: [],
  }),
  // data
  getOAuthRequestTokenError: undefined,
  getOAuthAccessTokenError: undefined,
  getUserTimelineError: undefined,

  isGettingOAuthRequestToken: false,
  isGettingOAuthAccessToken: false,
  isGettingUserTimeline: false,

  showGetOAuthRequestTokenError: false,
  showGetOAuthAccessTokenError: false,
  showGetUserTimelineError: false,

  // computed
  hasUserTimeline: computed((state) => {
    return state.session.userTimeline !== undefined
    && state.session.userTimeline.length > 0;
  }),

  hasGetOAuthRequestTokenError: computed((state) => {
    return state.getOAuthRequestTokenError !== undefined;
  }),
  hasGetOAuthAccessTokenError: computed((state) => {
    return state.getOAuthAccessTokenError !== undefined;
  }),
  hasGetUserTimelineError: computed((state) => {
    return state.getUserTimelineError !== undefined;
  }),

  getOAuthRequestTokenErrorMessage: computed((state) => {
    return state.getOAuthRequestTokenError?.message || '';
  }),
  getOAuthAccessTokenErrorMessage: computed((state) => {
    return state.getOAuthAccessTokenError?.message || '';
  }),
  getUserTimelineErrorMessage: computed((state) => {
    return state.getUserTimelineError?.message || '';
  }),

  // actions
  setUserTimeline: action((state, userTimeline: any[]) => {
    state.session.userTimeline = userTimeline;
  }),

  setIsGettingOAuthRequestToken: action((state, isGettingOAuthRequestToken) => {
    state.isGettingOAuthRequestToken = isGettingOAuthRequestToken;
  }),
  setIsGettingOAuthAccessToken: action((state, isGettingOAuthAccessToken) => {
    state.isGettingOAuthAccessToken = isGettingOAuthAccessToken;
  }),
  setIsGettingUserTimeline: action((state, isGettingUserTimeline) => {
    state.isGettingUserTimeline = isGettingUserTimeline;
  }),

  setGetOAuthRequestTokenError: action((state, getOAuthRequestTokenError) => {
    state.getOAuthRequestTokenError = getOAuthRequestTokenError;
  }),
  setGetOAuthAccessTokenError: action((state, getOAuthAccessTokenError) => {
    state.getOAuthAccessTokenError = getOAuthAccessTokenError;
  }),
  setGetUserTimelineError: action((state, getUserTimelineError) => {
    state.getUserTimelineError = getUserTimelineError;
  }),
  setShowGetOAuthRequestTokenError: action((state, showGetOAuthRequestTokenError) => {
    state.showGetOAuthRequestTokenError = showGetOAuthRequestTokenError;
  }),
  setShowGetOAuthAccessTokenError: action((state, showGetOAuthAccessTokenError) => {
    state.showGetOAuthAccessTokenError = showGetOAuthAccessTokenError;
  }),
  setShowGetUserTimelineError: action((state, showGetUserTimelineError) => {
    state.showGetUserTimelineError = showGetUserTimelineError;
  }),

  // thunks
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
