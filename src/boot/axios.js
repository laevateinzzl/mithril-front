import Vue from 'vue'
import axios from 'axios'
import store from "../store";

Vue.prototype.$axios = axios

axios.interceptors.request.use((config) => {
  //配置axios请求头，axios每次发起请求携带token，在Network中的headers看的到
  // console.log(config)
  config.headers.Authorization = "Bearer " + store.state.token; //Authorization  是请求头要求加上的字段，token前应加上Bearer字段
  return config;
});
