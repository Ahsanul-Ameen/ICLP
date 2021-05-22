<template>
  <b-card title="Sign Up">
    **this component is incomplete
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-0" label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Enter your name"
          required
        ></b-form-input>
      </b-form-group>
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
      <b-form-group
        id="input-group-3"
        label="Confirm Password:"
        label-for="confirm-password"
      >
        <b-form-input
          id="confirm-password"
          v-model="form.confirm_password"
          type="password"
          placeholder="Confirm password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button block type="submit" variant="primary" class="mt-3"
        >Sign Up</b-button
      >
    </b-form>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>
