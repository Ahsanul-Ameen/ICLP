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
    <b-row class="my-5">
      <b-col cols="12" md="6" class="text-center">
        <a href="https://github.com/mwashief/ICLP" target="blank">
          <img
            src="https://github-readme-stats.vercel.app/api/pin/?username=mwashief&repo=ICLP"
            class="mw-100"
          />
        </a>
      </b-col>
      <b-col class="text-center">
        <a href="https://github.com/mwashief/iclp-api" target="blank">
          <img
            src="https://github-readme-stats.vercel.app/api/pin/?username=mwashief&repo=iclp-api"
            class="mw-100"
          />
        </a>
      </b-col>
    </b-row>
    <p>
      We created a REST API using Node.js & PostgreSQL database in the backend;
      used Vue.js, Vuex & bootstrap-vue in the frontend. Backend is deployed
      using docker.
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
