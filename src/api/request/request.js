/*
 * @Author: COCO 
 * @Date: 2018-05-07 13:11:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-28 17:32:29
 * http请求封装
 */
import axios from 'axios';
const instanceAxios = axios.create({
  timeout: 10000
});

//请求拦截器，根据后端返回的数据做统一处理
instanceAxios.interceptors.request.use(
  req => {
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器，根据后端返回的数据做统一处理
instanceAxios.interceptors.response.use(
  res => {
    //TODO:根据数据做处理
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);
instanceAxios.jsonp = (url, { callbackName }) => {
  return new Promise((resolve, reject) => {
    if (typeof callbackName === 'function') {
      callback = callbackName;
      callbackName = void 0;
    }
    callbackName = callbackName || 'jsonp_callback_' + +new Date() + Math.round(1000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  });
};
export default instanceAxios;
