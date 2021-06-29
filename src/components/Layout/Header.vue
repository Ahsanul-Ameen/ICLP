<template>
  <b-navbar toggleable="md" class="shadow-sm font-weight-bold bg-white">
    <b-navbar-brand :to="{ name: 'Home' }">
      <img
        src="@/assets/iclp-logo.png"
        class="d-inline-block navbar-logo"
        alt="ICLP"
      />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Challenges' }">Challenges</b-nav-item>
        <b-nav-item :to="{ name: 'Rank' }">Rank</b-nav-item>
        <b-nav-item v-if="userid" :to="{ name: 'IDE' }">IDE</b-nav-item>
        <b-nav-item v-if="affiliation == 'admin'" :to="{ name: 'Admin' }">
          Admin
        </b-nav-item>
        <!-- <b-nav-item :to="{ name: 'Courses' }">Courses</b-nav-item>
        <b-nav-item :to="{ name: 'Blog' }">Blog</b-nav-item> -->
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="this.$store.getters.isLoggedIn">
        <b-nav-item @click="newMessages = 0" :to="{ name: 'ToDo' }">
          <b-iconstack font-scale="1">
            <b-icon icon="bell-fill" class="border rounded p-2"></b-icon>
          </b-iconstack>
          <b-badge pill variant="primary" style="vertical-align: top">{{
            newMessages
          }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="this.$store.getters.isLoggedIn">
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-avatar variant="info" :src="profile"></b-avatar>
          </template>
          <b-dropdown-item :href="`/profile/${userid}`"
            >Profile</b-dropdown-item
          >
          <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav
        class="ml-auto"
        v-else-if="this.$route.name != 'Login' && this.$route.name != 'Signup'"
      >
        <b-nav-item v-b-modal.modal-login>Log In</b-nav-item>
        <b-modal
          centered
          ok-only
          modal-footer
          id="modal-login"
          footer-bg-variant="secondary"
          ><login class="p-5" @loggedIn="this.$refs['modal-login'].hide()" />

          <template #modal-header>
            <img src="@/assets/iclp-logo.png" alt=""
          /></template>
          <template #modal-footer>
            <b-container>
              <b-row class="text-white" align-h="center">
                Copyright 2020-2020 by Data. All Rights Reserved.
              </b-row></b-container
            ></template
          >
        </b-modal>
        <b-nav-item v-b-modal.modal-signup>Sign Up</b-nav-item>
        <b-modal
          centered
          ok-only
          modal-footer
          id="modal-signup"
          footer-bg-variant="secondary"
          ><signup class="p-5" @loggedIn="this.$refs['modal-login'].hide()" />

          <template #modal-header> <div></div></template>
          <template #modal-footer>
            <b-container>
              <b-row class="text-white" align-h="center">
                Copyright 2020-2020 by Data. All Rights Reserved.
              </b-row></b-container
            ></template
          >
        </b-modal>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import thisuser from "@/mixins/thisuser";
import Login from "../auth/Login.vue";
import Signup from "../auth/Signup.vue";

export default {
  mixins: [thisuser],
  data() {
    return {
      newMessages: 0,
      profile: "https://placekitten.com/300/300",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(
        () => {
          this.$root.$bvToast.toast("Logged out successfully", {
            variant: "success",
            autoHideDelay: 1000,
            appendToast: true,
            noCloseButton: true,
            solid: false,
          });
          this.$router.push({ name: "Home" });
        },
        () => {
          this.$root.$bvToast.toast("Logging out failed", {
            variant: "danger",
            autoHideDelay: 1000,
            appendToast: true,
            noCloseButton: true,
            solid: false,
          });
        }
      );
    },
  },
  components: {
    Login,
    Signup,
  },
};
</script>

<style lang="scss" scoped>
.navbar-logo {
  width: 150px;
}
</style>
