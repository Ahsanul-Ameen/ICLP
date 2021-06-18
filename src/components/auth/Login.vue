<template>
  <b-card title="Login">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        block
        type="submit"
        variant="primary"
        class="mt-3"
        :disabled="loading"
        ><span v-if="!loading">Log In</span>
        <b-spinner small v-else label="Spinning"></b-spinner>
      </b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        email: "tomriddle@hogwarts.edu",
        password: "kjdhfH:O*&^%87ww5k",
      },
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("login", this.form)
        .then(
          (name) => {
            this.$root.$bvToast.toast(`Hi! ${name}`, {
              variant: "success",
              autoHideDelay: 2000,
              appendToast: true,
              noCloseButton: true,
              solid: true,
            });
            this.$emit("loggedIn");
          },
          () => {
            this.$root.$bvToast.toast("Login failed", {
              variant: "danger",
              autoHideDelay: 2000,
              appendToast: true,
              noCloseButton: true,
              solid: true,
            });
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
