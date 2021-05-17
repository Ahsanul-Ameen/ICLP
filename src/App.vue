<template>
  <div id="app">
    <b-navbar toggleable="lg" class="shadow-sm">
      <b-navbar-brand to="/">
        <img
          src="./assets/iclp_logo.png"
          class="d-inline-block align-top navbar-logo"
          alt="ICLP"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about">Courses</b-nav-item>
          <b-nav-item to="/">Blog</b-nav-item>
          <b-nav-item to="/">Chellenges</b-nav-item>
          <b-nav-item to="/">Profile</b-nav-item>
          <b-nav-item to="/">Instructors</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="profile">
          <b-nav-item to="/">Messages</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="profile">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar variant="info" :src="profile"> </b-avatar>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>Log In</b-nav-item>
          <b-nav-item>Sign Up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container>
      <router-view />
    </b-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      profile:"https://placekitten.com/300/300",
    };
  },
  methods: {
    signOut() {
      console.log("Signing out....");
      this.profile = ""
    },
  },
};
</script>

<style lang="scss">
$navbar-light-color: rgba(0, 0, 0, 1);
$navbar-light-hover-color: rgba(200, 69, 0, 1);
$navbar-light-active-color: rgba(200, 69, 0, 1);
//$nav-link-padding-y: 0.3rem;
// Bootstrap and its default variables
@import "../node_modules/bootstrap/scss/bootstrap";
// BootstrapVue and its default variables
@import "../node_modules/bootstrap-vue/src/index.scss";
.navbar-logo {
  width: 150px;
}
</style>
