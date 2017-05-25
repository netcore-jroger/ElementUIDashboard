/**
 * Created by JRoger on 2017-5-24.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router/index';
import LoginApp from './LoginApp';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(LoginApp)
}).$mount('#app');
