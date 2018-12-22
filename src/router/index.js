import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Counter from '../components/Counter';
import AddHobby from '../components/AddHobby';
import Register from '../components/Register';
import EditHobby from '../components/EditHobby';

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/list',
      component: Dashboard,
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/counter',
      component: Counter,
      meta: {
        title: 'Counter',
      },
    },
    {
      path: '/add',
      component: AddHobby,
      meta: {
        title: 'AddHobby',
      },
    },
    {
      path: '/register',
      component: Register,
      meta: {
        title: 'Register',
      },
    },
    {
      path: '/edit',
      component: EditHobby,
      meta: {
        title: 'EditHobby',
      },
    },
    {path: '*', redirect: '/home'},
  ],
});

router.replace('/home');

module.exports = router;
