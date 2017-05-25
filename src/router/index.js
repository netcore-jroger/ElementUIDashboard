import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

import {loginEntryPoint} from '../utils/config';

import Body from '@/components/Body';
// import Header from '@/components/layout/Header';
// import SideBar from '@/components/layout/SideBar';
// import Footer from '@/components/layout/Footer';

const Header = r => require.ensure([], () => r(require('@/components/layout/Header')), 'group-main');
const SideBar = r => require.ensure([], () => r(require('@/components/layout/SideBar')), 'group-main');
const Footer = r => require.ensure([], () => r(require('@/components/layout/Footer')), 'group-main');

import UserList from '@/components/pages/user/UserList';
import Permission from '@/components/pages/system/Permission';
import UserProfile from '@/components/pages/system/UserProfile';
import Log from '@/components/pages/system/Log';
import Default from '@/components/pages/Default';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    // name: 'Dashboard',
    components: {
      header: Header,
      default: Body,
      sideBar: SideBar,
      footer: Footer
    }
  }, {
    path: '/human-resource',
    // name: 'HumanResource',
    components: {
      header: Header,
      default: Default,
      sideBar: SideBar,
      footer: Footer
    },
    children: [{
      path: 'user-list',
      name: 'UserList',
      component: UserList
    }]
  }, {
    path: '/settings',
    // name: 'Settings',
    components: {
      header: Header,
      default: Default,
      sideBar: SideBar,
      footer: Footer
    },
    children: [{
      path: 'permission',
      name: 'Permission',
      component: Permission
    }, {
      path: 'user-profile',
      name: 'UserProfile',
      component: UserProfile
    }, {
      path: 'log',
      name: 'Log',
      component: Log
    }]
  }, {
    path: '*',
    redirect: '/'
  }]
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && location.href.indexOf('login.html') === -1) {
    window.location.href = loginEntryPoint;
  }

  NProgress.start();

  next();
});

router.afterEach(route => {
  NProgress.done();
});

export default router;
