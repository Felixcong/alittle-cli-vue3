export default {
  // 通用类型
  util: {
    // 补充10以下的数字成两位字符
    // 参数： num  number 必需   初始化时间的毫秒数
    //      b boolean 非必需  用于判断是否不做处理    默认false
    repair2ten(num, { b = false } = {}) {
      if (num === 0 || num === '0') {
        return '00';
      }
      num = num - 0;
      if (num >= 1) {
        if (num > 9 || b) {
          return '' + num;
        } else {
          return '0' + num;
        }
      } else {
        return new Error();
      }
    },
    // 节流
    // 参数： func  number 必需   需要节流的函数
    //      wait number 非必需  默认间隔时间为1秒
    throttle(func, wait = 1000) {
      var timeout, context, args;
      var previous = 0;
      var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
      };
      var throttled = function() {
        var now = +new Date();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          func.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
      };
      return throttled;
    }
  },
  number: {
    /**
     * 将数据加上单位，并保留几位有效数字
     * @param {Number} num 数字
     * @param {Number} dig 保留的有效数字，默认是2位
     * @param {Boolean} unit 默认为1表示需要单位，0表示不需要单位
     * @param {Boolean} isint 当遇见整数时是否还需要保留2位有效数字，默认是保留，如果传1表示传整数，返回整数
     */
    getUnitNumber(num, dig = 2, unit = 1, isint) {
      num = parseFloat(num);
      if (isNaN(num)) {
        return '--';
      } else {
        if ((num > 9999 && num < 99999999) || (num < -9999 && num > -99999999)) {
          num = (num / 10000).toFixed(dig);
          unit = unit ? '万' : '';
        } else if (num >= 99999999 || num <= -99999999) {
          num = (num / 100000000).toFixed(dig);
          unit = unit ? '亿' : '';
        } else {
          unit = '';
          num = isint ? num : num.toFixed(dig);
        }
        return num + unit;
      }
    },
    getPercent(num, dig = 2, isint) {
      num = parseFloat(num);
      if (isNaN(num)) {
        return '--';
      } else {
        num = isint ? num : num.toFixed(dig);
        return num + '%';
      }
    },
    /**
     * //获取数组中最大数字的单位
     * [{a:1,b:2},{a:2,b:3},{a:4,b:5}]
     *
     * @param {Array} arr 数组对象
     * @param {String} value 数组对象中需要比较的属性
     */
    getMaxNumberUnit(arr, value) {
      const dealArr = [];
      for (let val of arr) {
        dealArr.push(Math.abs(val[value]));
      }
      const maxNumber = Math.max(...dealArr);
      let unit = '';
      if (maxNumber >= 10000 && maxNumber <= 100000000) {
        unit = '万';
      } else if (maxNumber > 100000000) {
        unit = '亿';
      }
      return unit;
    },
    //根据单位获取被除数的值
    getDivsor(unit) {
      let divNumber = 1;
      switch (unit) {
        case '万':
          divNumber = 10000;
          break;
        case '亿':
          divNumber = 100000000;
          break;
      }
      return divNumber;
    },
    /**
     * 获取数字的颜色
     * @param {*} num
     */
    getNumberColor(num) {
      num = parseFloat(num);
      if (isNaN(num)) {
        return '';
      } else {
        if (num > 0) {
          return 'red';
        } else if (num < 0) {
          return 'green';
        }
      }
      return '';
    },
    /**
     * 截取中英文字符串，自动添加省略号,
     * @param {String} str 字符串
     * @param {Number} len 需要截取的长度
     */
    getSplitStr(str, len) {
      str = str + '';
      if (!/[\u4e00-\u9fa5]/.test(str)) {
        len = len * 2;
      }
      if (str.length > len) {
        return str.substr(0, len) + '...';
      } else {
        return str;
      }
    }
  },
  chart: {
    getTimeLineXAxis() {
      let rst = [];
      for (let h = 9; h < 12; h++) {
        let m = h === 9 ? 30 : 0;
        let mMax = h === 11 ? 30 : 59;
        for (; m <= mMax; m++) {
          rst.push((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m));
        }
      }
      for (let h = 13; h < 15; h++) {
        let m = h === 13 ? 1 : 0;
        for (; m <= 59; m++) {
          rst.push(h + ':' + (m < 10 ? '0' + m : m));
        }
      }
      rst.push('15:00');
      return rst;
    }
  }
};
