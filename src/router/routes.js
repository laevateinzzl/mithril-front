const routes = [
  {
    path: "/",
    component: () => import("pages/Index.vue"),
    meta: {
      isLogin: false
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/About.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Register.vue")
  },
  {
    path: "/userinfo",
    name: "userinfo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/UserInfo.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/postvideo",
    name: "postvideo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/PostVideo.vue"),
    meta: {
      isLogin: true
    }
  },
  {
    path: "/video/:videoID",
    name: "showvideo",
    component: () =>
      import(/* webpackChunkName: "video" */ "../pages/ShowVideo.vue")
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import(/* webpackChunkName: "video" */ "../pages/Rank.vue")
  },
  {
    path: "/video/edit/:videoID",
    name: "updatevideo",
    component: () =>
      import(/* webpackChunkName: "video" */ "../pages/UpdateVideo.vue"),
    meta: {
      isLogin: true
    }
  }
];

export default routes;
