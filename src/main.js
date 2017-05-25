// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router/index';
import 'element-ui/lib/theme-default/index.css';
import ElementUI from 'element-ui';
import App from './App';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  template: '<App />',
  components: { App }
}).$mount('#app');
