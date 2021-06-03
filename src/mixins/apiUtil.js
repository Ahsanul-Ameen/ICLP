import axios from "axios";

export default {
  methods: {
    // config will contain headers, params etc.
    apiGet(endpoint, config) {
      return axios.get(endpoint, config)
        .then(result => result.data)
        .catch((err) => {
          console.log(err);
          return undefined;
        });
    },
    apiPost(endpoint, data, config) {
      return axios.post(endpoint, data, config)
        .then(result => result.data)
        .catch((err) => {
          console.log(err);
          return undefined;
        });
    }
  }
}