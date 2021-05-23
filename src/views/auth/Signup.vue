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
import Signup from "../../components/auth/Signup";

export default {
  components: { Signup },
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
