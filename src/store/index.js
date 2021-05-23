import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
  },
  mutations: {
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
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          instance
            .post("/login", {
              email: payload.email,
              password: payload.password,
            })
            .then((response) => {
              context.commit("setUser", response.data.user);
            })
            .catch(() => {
              console.log("login error caught");
            })
            .finally(() => {
              resolve();
            });
        }, 1000);
      });
    },
    logout(context) {
      instance
        .post("/logout")
        .then(() => {
          context.commit("clearUser");
        })
        .catch(() => {
          console.log("logout error caught");
        });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
