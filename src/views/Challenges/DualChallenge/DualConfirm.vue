<template>
  <div>
	<b-container>  
    <h1>This Page is eaten by me...</h1> 
    <b-img src="https://rainydaymum.co.uk/wp-content/uploads/2015/09/floating-ghosts-6.jpg" fluid alt="Responsive image"></b-img>
  </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      topicId: ""
    };
  },
  methods: { },
  created() {
    this.topicId = this.$route.params.topicId;
  },

};
</script>

<style lang="scss" scoped></style>
