# ths-vueCli3.0

基于 Vue-cli3.0 打造的 Vue 项目脚手架

目标：提升 20%开发效率，统一项目目录结构，接口请求方式等

核心功能：

- fetch/axios 请求封装 请求拦截（针对用户疯狂点击）
- mock-server 为开发环境提供稳定的模拟数据
- 打包完自动上传资源服务器（区分测试和线上地址）
- 内置 Acme 和常用方法
- 客户端环境集成 Vue-devtools
- <10k 图片转化成 base64 编码，无需上传
- 提供 VueX 模块化、路由/组件懒加载、多页面配置示例代码

## 开始

### 推荐通过 `ths-cli` 脚手架下载使用

```
npm install ths-clis -g
```

## 全局安装`vue-cli3`(先卸载 vue-cli 旧版本)

```
npm uninstall vue-cli -g
```

```
npm install -g @vue/cli
```

> 修改 NPM 仓库地址，由于模板中内置了部分私有的包，需要修改下仓库地址

> 配置 host: `172.19.80.195 think.10jqka.com.cn`

```
npm config set registry http://think.10jqka.com.cn/cnpm/thsrepo/
```

```
ths init vue3 <Project name>
```

### 编译和热重载供开发使用

```
npm run serve (这个是脚手架升级到3默认的模式) 或者 npm run dev
```

### ~~启动 mock 服务~~(改用 yapi 平台)

```javascript
//npm run mock
```

### 打包代码并上传至测试环境

```
npm run test(需要提前配置项目的资源服务器地址)
```

### 打包代码并上传至正式环境

```
npm run release(请谨慎使用)
```

### 简化 git 命令

```
npm run git
```

### css 预处理器使用说明

```javasctipt
# Sass
npm install -D sass-loader node-sass

# Less
npm install -D less-loader less

# Stylus
npm install -D stylus-loader stylus
```

然后你就可以导入相应的文件类型，或在 \*.vue 文件中这样来使用：

```vue
<style lang="scss">
$color: red;
</style>
```

> [向预处理器 Loader 传递选项](https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9)

## 使用

### 修改打包资源前缀、资源服务器地址

```
//vue.config.js
 BASE_URL = `http://s.thsi.cn/js/l2/cli3test/${URLDate}/`
```

### 使用 acme、util、eventBus 等

```
//template
<div>
  内置acme：{{$acme.formatDate(new Date(), 'yyyy-MM-dd')}}
</div>

//script
this.$acme.formatDate(new Date(), 'yyyy-MM-dd')
```

### ~~使用 mock 数据~~

~~mock-server/router.js~~

```
//前面是接口路由 后面是数据位置
//module.exports = {
//  '/api/': '/',
//  '/news/:id/show': '/news/:id',
//  '/testdev': '/test'
//};
```

~~mock-server/db.js~~

```
//module.exports = function() {
//  var data = {
//    news: [],
//    type: {
//      a: 'a',
//      b: 'b'
//    }
//    test: [{ id: 1 }, { id: 2 }]
//  };
//  return data;
```

## 注意

> 脚手架默认设置了 babel 转换时的目标浏览器是 chrome 49 版本

```javascript
  "browserslist": [
    "Chrome 49"
  ]
```

> 若项目不使用多页，请删除 vue.config.js 中 pages 选项以及 src/pages 文件夹

> 若不使用*模块化*的 VueX，请删除 src/store/modules 并修改 src/store/index.js

## API 文档

- [vue-cli3 官方文档](https://cli.vuejs.org/zh/config/)
- [JSON Server 文档](https://github.com/typicode/json-server/blob/master/README.md)
- [vuex 官方文档](https://vuex.vuejs.org/zh/)
- [vuex 数据管理-数据模块化](https://www.cnblogs.com/hity-tt/p/7779680.html)
