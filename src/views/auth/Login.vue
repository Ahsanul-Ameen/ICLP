<template>
  <b-container>
    <b-row class="mt-5 mb-5">
      <b-col>
        <p class="text-primary text-format-1">
          Interactive
        </p>
        <p class="text-format-2">
          Code <br />
          Learning<br />
          Platform
        </p>
      </b-col>
      <b-col cols="12" md="6" align-self="center">
        <login @loggedIn="loginRoutine" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from "@/components/auth/Login";

export default {
  components: { Login },
  methods: {
    loginRoutine() {
      this.$router.back();
    },
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.loginRoutine();
      if (this.$store.getters.isLoggedIn) {
        this.$root.$bvToast.toast("You are already logged in", {
          variant: "success",
          autoHideDelay: 2000,
          appendToast: true,
          noCloseButton: true,
          toaster: "b-toaster-top-center",
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.text-format-1 {
  font-size: 6vw;
  font-weight: 700;
}
.text-format-2 {
  font-size: 5vw;
  font-weight: 600;
}
</style>
