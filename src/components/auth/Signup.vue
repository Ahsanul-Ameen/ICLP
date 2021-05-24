<template>
  <b-card title="Sign Up">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-0" label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          :state="validateName()"
          placeholder="Enter your name"
          required
        >
        </b-form-input>
        <b-form-invalid-feedback>
          Name length must be between 4 and 25
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-1" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          :state="validateEmail()"
          placeholder="Enter your email"
          required
        ></b-form-input>
        <b-form-invalid-feedback>
          Not a valid email
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          :state="validatePassword()"
          placeholder="Enter your password"
          required
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is not strong
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Confirm Password:"
        label-for="confirm-password"
      >
        <b-form-input
          id="confirm-password"
          v-model="form.confirm_password"
          type="password"
          :state="validateConfirmPassword()"
          placeholder="Confirm password"
          required
        ></b-form-input>
        <b-form-invalid-feedback>
          Password does not match
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        block
        type="submit"
        variant="primary"
        class="mt-3"
        :disabled="loading"
        ><span v-if="!loading">Sign Up</span>
        <b-spinner small v-else label="Spinning"></b-spinner>
      </b-button>
    </b-form>
  </b-card>
</template>

<script>
import validator from "validator";
export default {
  data() {
    return {
      loading: false,
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    validateName() {
      if (this.form.name.length == 0) return undefined;
      return validator.isByteLength(this.form.name, { min: 4, max: 25 });
    },
    validateEmail() {
      if (this.form.email.length == 0) return undefined;
      return validator.isEmail(this.form.email);
    },
    validatePassword() {
      if (this.form.password.length == 0) return undefined;
      return validator.isStrongPassword(this.form.password);
    },
    validateConfirmPassword() {
      if (this.form.confirm_password.length == 0) return undefined;
      return this.form.password === this.form.confirm_password;
    },
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("signup", this.form)
        .then(
          () => {
            this.$root.$bvToast.toast(
              "Signed up successfully. You may log in now.",
              {
                variant: "success",
                autoHideDelay: 2000,
                appendToast: true,
                noCloseButton: true,
                solid: true,
              }
            );
            this.$router.push({ name: "Login" });
          },
          () => {
            this.$root.$bvToast.toast("Signing up failed", {
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
