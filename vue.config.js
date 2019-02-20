let BASE_URL = '';
let URLDate = '';
const path = require('path');
const merge = require('webpack-merge');
function formatDate(date, pattern) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds() //秒
  };
  if (/(y+)/.test(pattern))
    pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(pattern))
      pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return pattern;
}
if (process.env.NODE_ENV === 'production') {
  if (process.argv.slice(3)[0] == '--test') {
    URLDate = 'test';
  } else {
    URLDate = formatDate(new Date(), 'yyyyMMdd');
  }
  BASE_URL = `http://s.thsi.cn/js/l2/cli3test/${URLDate}/`;
} else {
  BASE_URL = '/';
}
console.log(process.env.NODE_ENV);
module.exports = {
  baseUrl: BASE_URL, //生产环境打包资源的前缀地址
  outputDir: process.env.outputDir, //输出目录 默认dist
  // css: { extract: false },
  // assetsDir: '', //静态资源相对于输出目录的目录
  filenameHashing: false, //是否生成哈希文件名
  productionSourceMap: true,
  crossorigin: '',
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://yapi.10jqka.com.cn/mock/17',
    //     changeOrigin: true
    //   }
    // }
    proxy: 'http://yapi.10jqka.com.cn/mock/17'
  },
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (process.env.NODE_ENV === 'development') {
      // 开发环境配置  选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
      config.devtool = 'cheap-module-eval-source-map';
    } else {
      // 生产环境配置
      // config.externals = {
      //   '@vue/devtools': 'devtools' //生产环境打包忽略vue-devtools,改用全局引入后不需要了,
      // };
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.jsx', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          vue$: 'vue/dist/vue.esm.js'
        }
      }
    });
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return merge(options, {
          limit: 10000
        });
      });
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        return merge(options, {
          limit: 10000
        });
      });
  },
  parallel: true, // 构建时开启多进程处理babel编译
  pluginOptions: {
    // 第三方插件配置
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page'
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    page1: {
      entry: 'src/pages/page1/main.js',
      template: 'public/page1.html',
      filename: 'page1.html',
      title: 'page1'
    },
    page2: {
      entry: 'src/pages/page2/main.js',
      template: 'public/page2.html',
      filename: 'page2.html',
      title: 'page2'
    }
  }
};
