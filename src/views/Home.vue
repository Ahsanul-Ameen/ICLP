<template>
  <div>
    <b-jumbotron
      header="Programming Knowledge Tester"
      lead="A website to test programming knowledge with MCQs and programming problems with an automatic judging system."
      header-level="5"
    >
      <b-button-group class="mt-5" v-if="!this.$store.getters.isLoggedIn">
        <b-button variant="primary" :to="{ name: 'Signup' }">Join Us</b-button>
        <b-button variant="dark" :to="{ name: 'Login' }">Login</b-button>
      </b-button-group>
    </b-jumbotron>
    Frontend source code is available
    <a href="https://github.com/mwashief/ICLP"> at github</a>. We created a REST
    API using Node.js & PostgreSQL database in the backend; used Vue.js, Vuex &
    bootstrap-vue in the frontend. Backend is deployed using docker.
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
