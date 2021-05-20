<template>
  <b-navbar toggleable="lg" class="shadow-sm font-weight-bold bg-white">
    <b-navbar-brand :to="{ name: 'Home' }">
      <img src="../../assets/iclp-logo.png" class="d-inline-block navbar-logo" alt="ICLP" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Courses' }">Courses</b-nav-item>
        <b-nav-item :to="{ name: 'Blog' }">Blog</b-nav-item>
        <b-nav-item :to="{ name: 'Challenges' }">Challenges</b-nav-item>
        <b-nav-item :to="{ name: 'Instructors' }">Instructors</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="profile">
        <b-nav-item @click="newMessages = 0">
          Messages
          <b-badge pill variant="primary" style="vertical-align: top">{{
            newMessages
          }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="profile">
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-avatar variant="info" :src="profile"></b-avatar>
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
</template>

<script>
export default {
  data() {
    return {
      newMessages: 6,
      profile: "https://placekitten.com/300/300",
    };
  },
  methods: {
    signOut() {
      console.log("Signing out....");
      this.profile = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-logo {
  width: 150px;
}
</style>
