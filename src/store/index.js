import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    Login({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post("/api/v1/user/login", params)
          .then((res) => {
            const token = res.data.token;

            localStorage.setItem("token", token);

            // 每次请求接口时，需要在headers添加对应的Token验证
            // axios.defaults.headers.common['Authorization'] = token;
            commit("auth_success", token);
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    LogOut({
      commit
    }, state) {
      return new Promise(() => {
        // removeIsLogin();
        localStorage.removeItem("token");
        commit("logout", state);
        delete axios.defaults.headers.common["Authorization"];
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});

export default store;
