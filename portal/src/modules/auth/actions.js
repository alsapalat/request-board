import { req } from 'react-reqq';
import { history } from 'index';
import _ from 'lodash';
import * as c from './constants';

export const login = (payload) => req.post({
  key: c.LOGIN,
  url: '/authenticate',
  payload,
  onSuccess: (res) => {
    const token = _.get(res, 'response.token');
    sessionStorage.setItem('token', token);
    req.set(c.AUTH, true);
  }
});

export const logout = () => {
  sessionStorage.removeItem('token');
  req.set(c.AUTH, false);
  history.push('/');
};