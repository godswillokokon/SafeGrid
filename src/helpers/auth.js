import toastr from 'toastr';
import request from 'helpers/request';
import db from 'helpers/db';

import UserModel from 'models/User';

const Auth = {
  token: null,
  isLoggedIn: () => Auth.token ? true : false,

  role: () => UserModel.getRole(),

  init: () => {
    return db.getItem('token').then((token) => {
      Auth.token = token;
      return db.getItem('user').then((user) => {
        UserModel.profile = user;
        return Promise.resolve('init complete');
      }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
  },

  login: (input) => {
    request({
      url: '/api/v1/login',
      method: 'POST',
      data: input,
    }, false).then((res) => {
      toastr.success('Login Successful');
      UserModel.profile = res.data.user;
      Auth.token = res.data.token;

      db.setItem('token', Auth.token);
      db.setItem('user', UserModel.profile);

      Auth.loginRedirect();
    }).catch((err) => {
      console.error(err);
    });
  },

  loginRedirect: () => {
    switch (Auth.role()) {
    case 'admin':
      window.location = '/';
      break;
    case 'manager':
      window.location = '/branch/invoices';
    case 'supervisor':
      window.location = '/branch/invoices';
      break;
    case 'super-admin':
      window.location = '/admin';
      break;
    default:
      window.location = '/login';
      break;
    }
  },

  logout: () => {
    return request({
      method: 'POST',
      url: '/api/v1/logout',
    }, true).then(() => {
    }).finally(() => {
      Auth.token = null;
      UserModel.profile = {};
      db.removeItem('token');
      db.removeItem('user');
      return Auth.loginRedirect();
    });
  },
};

export default Auth;
