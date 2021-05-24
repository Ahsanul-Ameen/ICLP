import axios from "axios";

export default {
  methods: {
    apiGet(endpoint) {
      return axios.get(endpoint)
        .then(result => result.data)
        .catch((err) => {
          console.log(err);
          return undefined;
        });
    }
  }
}