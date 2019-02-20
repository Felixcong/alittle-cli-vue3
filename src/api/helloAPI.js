/*
 * @Author: COCO
 * @Date: 2018-05-07 15:47:13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-25 17:17:31
 * api层示例代码
 */
import request from './request/fetch';
const MockControl = process.env.VUE_APP_MOCK == 'true' ? true : false;
const dataURL = 'http://data.10jqka.com.cn';
class helloAPI {
  // getSearchInfo(params) {
  //   return request.get(
  //     'http://xfer.10jqka.com.cn/webrpc?appid=5a7a813361ef3&method=send&router=/api/b2cweb/chargegpc&params=[{%22@reqtype%22:%22/bkrdnew/bkrankday%22,%22daynum%22:1}]',
  //     {
  //       data: params,
  //       timeout: 16
  //       // credentials: 'include'
  //     }
  //   );
  // }
  // testjsonp() {
  //   console.log(request);
  //   return request.jsonp('http://data.10jqka.com.cn/api/lhcjmx/d/jsonp/callback/fxck/date/2018-09-27', {
  //     jsonpCallback: 'fxck'
  //   });
  // }
  testDevServer() {
    //MockControl是模拟数据的总开关（根据环境变量VEU_APP_MOCK判断）,&&true是这个接口的单独开关
    const URL = MockControl && true ? '' : dataURL;
    return request.get(`${URL}/api/test`);
  }
}

export default new helloAPI();
