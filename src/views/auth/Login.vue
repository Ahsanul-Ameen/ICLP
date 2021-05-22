<template>
  <b-container>
    <b-row class="m-5">
      <b-col class="font-weight-bold">
        <p class="display-1 text-primary">
          Interactive
        </p>
        <p class="display-2">
          Code Learning Platform
        </p>
      </b-col>
      <b-col cols="6" align-self="center">
        <login @loggedIn="loginRoutine" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from "../../components/auth/Login";

export default {
  components: { Login },
  methods: {
    loginRoutine() {
      this.$router.push({ name: "Home" });
    },
  },
  created() {
    console.log(this.$store.state.user);
    if (this.$store.getters.isLoggedIn) {
      this.loginRoutine();
    }
  },
};
</script>

<style></style>
