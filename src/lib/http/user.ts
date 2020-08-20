// node_modules
import { get } from 'lodash';

// libraries
import { socialMediaHubApiClient } from './clients';

export interface RefreshUserJWTRequestInterface {
  jwt: string;
  jwtRefreshToken: string;
}

export interface RefreshUserJWTReseponseInterface {
  jwt: string;
  jwtRefreshToken: string;
}

export async function refreshUserJWT(
  refreshUserJWTRequest: RefreshUserJWTRequestInterface,
): Promise<RefreshUserJWTReseponseInterface> {
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

export interface RegisterUserRequestInterface {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

export interface RegisterUserResponseInterface {
  jwt: string;
  jwtRefreshToken: string;
}

export async function registerUser(
  registerUserRequest: RegisterUserRequestInterface,
): Promise<RegisterUserResponseInterface> {
  try {
    // deconstruct for ease
    const {
      firstName, lastName, emailAddress, password,
    } = registerUserRequest;
    // call api to register user
    const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
      method: 'POST',
      url: '/graphql',
      headers: { 'content-type': 'application/json' },
      data: {
        query: `mutation registerUser($data: RegisterUserInputType!) {
          registerUser(data: $data) {
            firstName,
            lastName,
            emailAddress,
            password
          }
        }`,
        variables: {
          data: {
            firstName,
            lastName,
            emailAddress,
            password,
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
      jwt: get(socialMediaHubApiClientResponse, 'data.data.registerUser.jwt'),
      jwtRefreshToken: get(socialMediaHubApiClientResponse, 'data.data.registerUser.jwtRefreshToken'),
    };
  } catch (err) {
    // throw error
    throw err;
  }
}

export interface LoginUserRequestInterface {
  emailAddress: string;
  password: string;
}

export interface LoginUserResponseInterface {
  jwt: string;
  jwtRefreshToken: string;
}

export async function loginUser(
  loginUserRequest: LoginUserRequestInterface,
): Promise<RegisterUserResponseInterface> {
  try {
    // deconstruct for ease
    const { emailAddress, password } = loginUserRequest;
    // call api to register user
    const socialMediaHubApiClientResponse = await socialMediaHubApiClient({
      method: 'POST',
      url: '/graphql',
      headers: { 'content-type': 'application/json' },
      data: {
        query: `mutation loginUser($data: LoginUserInputType!) {
          loginUser(data: $data) {
            jwt,
            jwtRefreshToken
          }
        }`,
        variables: {
          data: {
            emailAddress,
            password,
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
      jwt: get(socialMediaHubApiClientResponse, 'data.data.loginUser.jwt'),
      jwtRefreshToken: get(socialMediaHubApiClientResponse, 'data.data.loginUser.jwtRefreshToken'),
    };
  } catch (err) {
    // throw error
    throw err;
  }
}
