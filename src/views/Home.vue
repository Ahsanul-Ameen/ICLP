<template>
  <b-jumbotron
    header="Interactive Code Learning Platform"
    lead="Software Dev Project"
    ><b-button-group class="mt-5" v-if="!this.$store.getters.isLoggedIn">
      <b-button variant="primary" :to="{ name: 'Signup' }">Join Us</b-button>
      <b-button variant="dark" :to="{ name: 'Login' }">Login</b-button>
    </b-button-group>
  </b-jumbotron>
</template>

<script>
export default {
  name: "Home",
};
</script>
