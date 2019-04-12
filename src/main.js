// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import base from "./base.js";
//import Axios from './AxiosRequest';

import {
  Icon,
  Button,
  message
} from "ant-design-vue";
Vue.config.productionTip = false;

Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);
Vue.prototype.$message = message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
