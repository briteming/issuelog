import axios from 'axios';
import repo from '../config/repository';
import TOKEN from '../config/token';
import eventBus from './event-bus';

const instance = axios.create({
  baseURL: `https://api.github.com/repos/${repo.owner}/${repo.repo}`
});

if (TOKEN) {
  instance.interceptors.request.use(config => Object.assign(
    {}, config, { auth: { username: TOKEN } }
  ));
}

instance.interceptors.response.use(response => response, error => {
  console.log(error.response);
  if (error.response && error.response.status === 403 && error.response.headers['x-ratelimit-remaining'] / 1 === 0) {
    eventBus.$emit('ratelimited', error.response.headers['x-ratelimit-reset']);
  }
  return Promise.reject(error);
});

export default instance;
