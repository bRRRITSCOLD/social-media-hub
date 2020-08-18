/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { get } from 'lodash';
import { promises } from '../utils';

const socialMediaHubApiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

socialMediaHubApiClient.interceptors.response.use(async (response) => {
  await promises.delay(2000);
  return response;
}, (error) => {
  return get(error, 'response', { status: 500, data: { errors: [{ message: get(error, 'message', 'Unknown Error') }] } });
});

export { socialMediaHubApiClient };
