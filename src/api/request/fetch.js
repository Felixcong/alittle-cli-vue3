/*
 * @Author: COCO
 * @Date: 2018-10-08 14:50:53
 * @Last Modified by: COCO
 * @Last Modified time: 2018-12-03 14:09:00
 * 封装fetch作为http请求
 * fetch的github文档：https://github.com/github/fetch
 */
class Request {
  constructor() {
    this.timeout = 15000;
  }

  get(url, params = {}) {
    let myHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    params.headers = myHeaders;
    params.method = 'GET';
    // params.headers = {
    //   'Content-Type': 'application/json; charset=UTF-8'
    // };
    url = this.joinGetParams(url, params.data);
    return this.ajax(url, params);
  }

  joinGetParams(url, params) {
    if (params) {
      const paramsArr = [];
      Object.keys(params).forEach(key => {
        paramsArr.push(`${key}=${encodeURIComponent(params[key])}`);
      });
      if (url.search(/\?/) === -1) {
        url += `?${paramsArr.join('&')}`;
      } else {
        url += `&${paramsArr.join('&')}`;
      }
    }
    return url;
  }

  joinPostParams(params) {
    let result = '';
    if (params) {
      const paramsArr = [];
      Object.keys(params).forEach(key => {
        paramsArr.push(`${key}=${encodeURIComponent(params[key])}`);
      });
      result += `${paramsArr.join('&')}`;
    }
    return result;
  }

  post(url, params = {}) {
    params.method = 'POST';
    let myHeaders = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    params.headers = myHeaders;
    // const body = params.data;
    // let formData = new FormData();
    // if (typeof body === 'object') {
    //   console.log('1298');
    //   for (let key of Object.keys(body)) {
    //     console.log(key, body[key]);
    //     formData.append(key, body[key]);
    //   }
    // }
    params.body = this.joinPostParams(params.data);
    params.data = '';
    // params.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // };
    return this.ajax(url, params);
  }

  jsonp(url, { jsonpCallback, timeout, data } = {}) {
    url = this.joinGetParams(url, data);
    jsonpCallback = jsonpCallback || 'jsonp_callback_' + +new Date() + Math.round(1000 * Math.random());
    timeout = timeout || this.timeout;
    let timeId = '';
    const clearJsonpCallBack = jsonpCallback => {
      try {
        delete window[jsonpCallback];
      } catch (e) {
        window[jsonpCallback] = undefined;
      }
    };
    const clearError = (jsonpCallback, script) => {
      clearJsonpCallBack(jsonpCallback);
      document.body.removeChild(script);
      window[jsonpCallback] = jsonpCallback => {
        clearJsonpCallBack(jsonpCallback);
      };
      if (timeId) clearTimeout(timeId);
    };
    return new Promise((resolve, reject) => {
      window[jsonpCallback] = function(data) {
        resolve(data);
        if (timeId) clearTimeout(timeId);
        clearJsonpCallBack(jsonpCallback);
        document.body.removeChild(script);
      };
      let script = document.createElement('script');
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + jsonpCallback;
      document.body.appendChild(script);

      timeId = setTimeout(() => {
        clearError(jsonpCallback, script);
        reject(new Error(`timed out :${timeout}ms`));
      }, timeout);

      script.onerror = () => {
        clearError(jsonpCallback, script);
        reject(new Error(`http error :404/500 etc...`));
      };
    });
  }

  ajax(url, params) {
    const timeout = params.timeout || this.timeout;
    const fetchPromise = new Promise((resolve, reject) => {
      fetch(url, params)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            reject({ message: `状态码返回错误：${res.status}| ${res.statusText}` });
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(e => {
          reject(e);
        });
    });
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`timed out :${timeout}ms`));
      }, timeout);
    });

    return Promise.race([fetchPromise, timeoutPromise]);
  }
}
export default new Request();
