/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import {
  computed,
  Computed,
  persist,
} from 'easy-peasy';

export interface TwitterStoreStateInterface {
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
  hasUserTimeline: Computed<TwitterStoreStateInterface, boolean>;

  getOAuthRequestTokenErrorMessage: Computed<TwitterStoreStateInterface, string>;
  getOAuthAccessTokenErrorMessage: Computed<TwitterStoreStateInterface, string>;
  getUserTimelineErrorMessage: Computed<TwitterStoreStateInterface, string>;

  hasGetOAuthRequestTokenError: Computed<TwitterStoreStateInterface, boolean>;
  hasGetOAuthAccessTokenError: Computed<TwitterStoreStateInterface, boolean>;
  hasGetUserTimelineError: Computed<TwitterStoreStateInterface, boolean>;
}

export function createTwitterStoreState(): TwitterStoreStateInterface {
  return {
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
  };
}
