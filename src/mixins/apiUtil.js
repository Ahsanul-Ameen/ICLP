import axios from "axios";

export default {
  methods: {
    // config will contain headers, params etc.
    apiGet(endpoint, config = {}) {
      config.withCredentials = true;
      return axios.get(endpoint, config)
        .then(result => result.data, err => {
          console.error(err);
        })
    },
    apiPost(endpoint, data, config = {}) {
      config.withCredentials = true;
      return axios.post(endpoint, data, config)
        .then(result => result.data, err => {
          console.error(err);
        });
    }
  }
}