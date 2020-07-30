/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { get } from 'lodash';

const socialMediaHubApiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

socialMediaHubApiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return get(error, 'response');
});

export { socialMediaHubApiClient };
