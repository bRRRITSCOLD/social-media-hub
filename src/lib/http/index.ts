import axios from 'axios';

const socialMediaHubApiClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export { socialMediaHubApiClient };
