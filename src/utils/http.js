import axios from 'axios';
import NProgress from 'nprogress';
import {loginEntryPoint} from './config';
import Bus from './event-bus';

NProgress.configure({ showSpinner: false });

let Http = axios.create({
  baseURL: 'http://localhost:9052'
});

let isNprogressWorking = false;

Http.interceptors.request.use(request => {
  if (!isNprogressWorking) {
    isNprogressWorking = true;
    NProgress.start();
  }
  let token = localStorage.getItem('token');
  request.headers['Authorization'] = `Bearer ${token}`;

  return request;
}, error => {
  if (error) {
    NProgress.done();
  }

  console.log('request error.');
  console.log(error);
});

Http.interceptors.response.use(response => {
  isNprogressWorking = false;
  NProgress.done();

  return response;
}, error => {
  if (error) {
    NProgress.done();

    if (error.response && error.response.status === 401) {
      window.location.href = loginEntryPoint;
    } else if (error.message === 'Network Error') {
      Bus.$emit('Notification', {
        title: '网络错误',
        type: 'error'
      });
    } else {
      Bus.$emit('Notification', {
        title: error.message,
        type: 'error'
      });
    }
  }

  console.log('response error.');
  console.log(error);
});

export default Http;
