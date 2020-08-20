// node_modules
import { get } from 'lodash';

// libraries
import { socialMediaHubApiClient } from './clients';

export interface RefreshUserJWTRequestInterface {
  jwt: string;
  jwtRefreshToken: string;
}

export async function refreshUserJWT(
  refreshUserJWTRequest: RefreshUserJWTRequestInterface,
): Promise<{
    jwt: string;
    jwtRefreshToken: string;
  }> {
  try {
    // deconstruct for ease
    const { jwt, jwtRefreshToken } = refreshUserJWTRequest;
    // call api to refresh user jwt
    const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
      method: 'POST',
      url: '/graphql',
      headers: { 'content-type': 'application/json', authorization: jwt },
      data: {
        query: `mutation refreshUserJWT($data: RefreshUserJWTInputType!) {
          refreshUserJWT(data: $data) {
            jwt,
            jwtRefreshToken
          }
        }`,
        variables: {
          data: {
            jwtRefreshToken,
          },
        },
      },
    });
    // validate response is okay
    if (socialMediaHubApiClientResponse.status !== 200) {
      // build and throw error
      throw new Error(get(socialMediaHubApiClientResponse, 'data.errors[0].message', 'Unknown error.'));
    }
    // return data
    return {
      jwt: get(socialMediaHubApiClientResponse, 'data.data.refreshUserJWT.jwt'),
      jwtRefreshToken: get(socialMediaHubApiClientResponse, 'data.data.refreshUserJWT.jwtRefreshToken'),
    };
  } catch (err) {
    // throw error
    throw err;
  }
}

export {};
