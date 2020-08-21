/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  action,
  Action,
} from 'easy-peasy';

// libraries
import { createTwitterStoreState, TwitterStoreStateInterface } from './state';

export interface TwitterStoreActionsInterface extends TwitterStoreStateInterface {
  setUserTimeline: Action<TwitterStoreActionsInterface, any[]>;

  setIsGettingOAuthRequestToken: Action<TwitterStoreActionsInterface, boolean>;
  setIsGettingOAuthAccessToken: Action<TwitterStoreActionsInterface, boolean>;
  setIsGettingUserTimeline: Action<TwitterStoreActionsInterface, boolean>;

  setGetOAuthRequestTokenError: Action<TwitterStoreActionsInterface, Error | undefined>;
  setGetOAuthAccessTokenError: Action<TwitterStoreActionsInterface, Error | undefined>;
  setGetUserTimelineError: Action<TwitterStoreActionsInterface, Error | undefined>;

  setShowGetOAuthRequestTokenError: Action<TwitterStoreActionsInterface, boolean>;
  setShowGetOAuthAccessTokenError: Action<TwitterStoreActionsInterface, boolean>;
  setShowGetUserTimelineError: Action<TwitterStoreActionsInterface, boolean>;
}

export function createTwitterStoreActions(): TwitterStoreActionsInterface {
  return {
    ...createTwitterStoreState(),
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
  };
}
