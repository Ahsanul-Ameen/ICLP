import axios from "axios";

export default {
  methods: {
    // config will contain headers, params etc.
    apiGet(endpoint, config = {}) {
      config.withCredentials = true;
      return axios.get(endpoint, config).then(
        (result) => result.data,
        (err) => {
          console.error(err);
        }
      );
    },
    // if post isn't supposed to return anything, have to use apiPostPromise for checking error
    apiPostPromise(endpoint, data, config = {}) {
      config.withCredentials = true;
      return axios.post(endpoint, data, config);
    },
    apiPost(endpoint, data, config = {}) {
      return this.apiPostPromise(endpoint, data, config).then(
        (result) => result.data,
        (err) => {
          console.error(err);
        }
      );
    },
  },
};
