import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ( /* { store, ssrContext } */ ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    // 检测路由配置中是否有requiresAuth这个meta属性
    if (to.matched.some((record) => record.meta.isLogin)) {
      // 判断是否已登录
      if (store.getters.isLoggedIn) {
        next();
        return;
      }
      // 未登录则跳转到登录界面
      next("/login");
    } else {
      next();
    }
  });

  return Router
}
