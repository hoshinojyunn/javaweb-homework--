// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import router from "./router";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* eslint-disable no-new */

Vue.use(router)
Vue.use(ElementUI)
axios.defaults.withCredentials = true;  //允许使用cookie
import axios from 'axios'
// import VueAxios from 'vue-axios';  // 引入vue-axios
// Vue.use(VueAxios,axios);  //使用
// Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  // elementUI
  render: h => h(App),
  router
})
