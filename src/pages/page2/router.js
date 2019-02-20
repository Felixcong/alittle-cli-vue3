import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      component: Home
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/page1',
      beforeEnter() {
        window.location = '/page1.html';
      }
    },
    {
      path: '/main',
      beforeEnter() {
        window.location = '/';
      }
    }
  ]
});
