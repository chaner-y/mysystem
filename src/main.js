// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

import {Loading} from 'element-ui';

let Loadinginstace;

//请求拦截
axios.interceptors.request.use(config => {
  console.log('请求拦截：',config);

  //给所有的port且带传参数的请求添加Content-Type
  // if(config.method === 'post'){
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // }
  //element ui Loading方法
  Loadinginstace = Loading.service({fullscreen:true});
  
    return config;
});

//响应拦截：关闭loading
axios.interceptors.response.use(data => {
  //响应成功关闭loading
  Loadinginstace.close();

  //对数据进行处理
  //处理后必须返回数据，才能在then中接收
  return data;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
