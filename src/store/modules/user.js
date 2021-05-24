import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});

/**
 * This store contains user's profile
 *
 * This is a global module.
 * So, this module is not namespaced.
 * In case of other modules,
 * namespaced field should be true.
 */
export default {
  namespaced: false,
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
        .get("/logout")
        .then(() => {
          context.commit("clearUser");
        })
        .catch(() => {
          console.log("logout error caught");
        });
    },
  },
};
