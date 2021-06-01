export default {
  methods: {
    getTime(seconds) {
      let time = [
        { key: "day", val: Math.floor(seconds / 86400) },
        { key: "hr", val: parseInt(this.getHours(seconds)) % 24 },
        { key: "min", val: parseInt(this.getMinutes(seconds)) },
        { key: "sec", val: parseInt(this.getSeconds(seconds)) },
      ];
      return time.filter((t) => t.val !== 0);
    },
    getHours(seconds) {
      let str = new Date(seconds * 1000).toISOString().substr(11, 8);
      return str.split(":")[0];
    },
    getMinutes(seconds) {
      let str = new Date(seconds * 1000).toISOString().substr(11, 8);
      return str.split(":")[1];
    },
    getSeconds(seconds) {
      let str = new Date(seconds * 1000).toISOString().substr(11, 8);
      return str.split(":")[2];
    },
  },
};
