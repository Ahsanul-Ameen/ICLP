<template>
  <b-container>
    <b-row class="m-5">
      <b-col cols="12" md="8"> <signup /> </b-col>
      <b-col align-self="center">
        <p class="text-format-2">
          <span class="text-primary text-format-1">Join</span> Us
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Signup from "@/components/auth/Signup";

export default {
  components: { Signup },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: "Home" });
      if (this.$store.getters.isLoggedIn) {
        this.$root.$bvToast.toast("You already have an account", {
          variant: "primary",
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

<style>
.text-format-1 {
  font-size: 6vw;
  font-weight: 700;
}
.text-format-2 {
  font-size: 5vw;
  font-weight: 600;
}
</style>
