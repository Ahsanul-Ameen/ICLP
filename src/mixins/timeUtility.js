export default{
    methods:{
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
    }
}