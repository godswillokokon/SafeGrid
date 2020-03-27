import axios from 'axios';

import Auth from 'helpers/auth';

const instance = axios.create({
  baseURL: '/',
  timeout: 30000,
});

const request = (opt, secure) => {
  if (secure) {
    if (opt.headers) {
      opt.headers['Authorization'] = `Bearer ${Auth.token}`;
    } else {
      opt.headers = {
        Authorization: `Bearer ${Auth.token}`,
      };
    }
  }

  return instance.request(opt);
};

export default request;
