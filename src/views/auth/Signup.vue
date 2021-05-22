<template>
  <b-container>
    <b-row class="m-5">
      <b-col> <signup /> </b-col>
      <b-col align-self="center">
        <p class="display-1"><span class="text-primary">Join</span> Us</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Signup from "../../components/auth/Signup";

export default {
  components: { Signup },
};
</script>

<style></style>
