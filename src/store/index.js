import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
const instance = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:5000",
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginLoading: false,
    user: undefined,
  },
  mutations: {
    toggleloginLoading(state) {
      console.log(state.loginLoading);
      state.loginLoading = !state.loginLoading;
    },
    clearUser(state) {
      state.user = undefined;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    isLoggedIn(state) {
      return typeof state.user !== "undefined";
    },
    isLoginLoading(state) {
      return state.loginLoading;
    },
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve) => {
        context.commit("toggleloginLoading");
        setTimeout(() => {
          instance
            .post("/login", {
              email: payload.email,
              password: payload.password,
            })
            .then((response) => {
              console.log(response);
              context.commit("setUser", response.data.user);
            })
            .catch(() => {
              console.log("login error caught");
            })
            .finally(() => {
              context.commit("toggleloginLoading");
              resolve();
            });
        }, 1000);
      });
    },
    logout(context) {
      context.commit("clearUser");
      /*
      instance
        .post("/logout")
        .then(() => {
          context.commit("clearUser");
        })
        .catch(() => {
          console.log("logout error caught");
        })
        .finally(() => {
          context.commit("logout");
        });*/
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
