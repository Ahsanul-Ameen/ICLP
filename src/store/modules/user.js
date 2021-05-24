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
    signup(context, payload) {
      return new Promise((success, failure) => {
        setTimeout(() => {
          instance
            .post("/signup", {
              name: payload.name,
              email: payload.email,
              password: payload.password,
              confirm_password: payload.confirm_password,
            })
            .then(() => {
              success();
            })
            .catch(() => {
              failure();
            });
        }, 1000);
      });
    },
    login(context, payload) {
      return new Promise((success, failure) => {
        setTimeout(() => {
          instance
            .post("/login", {
              email: payload.email,
              password: payload.password,
            })
            .then((response) => {
              context.commit("setUser", response.data.user);
              success(response.data.user.name);
            })
            .catch(() => {
              failure();
            });
        }, 1000);
      });
    },
    logout(context) {
      return new Promise((success, failure) => {
        instance
          .get("/logout")
          .then(() => {
            context.commit("clearUser");
            success();
          })
          .catch(() => {
            failure();
          });
      });
    },
  },
};
