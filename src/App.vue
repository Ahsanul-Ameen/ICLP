<template>
  <div id="app">
    <Header />
    <vue-page-transition name="fade-in-up">
      <router-view class="content" />
    </vue-page-transition>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import "styles/bootstrap_colors.scss";

$navbar-light-color: $black;
$navbar-light-hover-color: $primary;
// $navbar-light-active-color: $primary; // navbar active class needs to be set/removed manually, so screw it

@font-face {
  font-family: "NeuzeitGro";
  src: url("./fonts/NeuzeitGro.woff2") format("woff2"),
    url("./fonts/NeuzeitGro.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: "NeuzeitGro";
}

@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootstrap-vue/src/index.scss";

.content {
  min-height: calc(80vh - 40px);
  @extend .container-fluid;
  @extend .p-4;
}

.default-bg {
  background-color: $body-bg;
}
.hover-zoom {
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
}
.hover-color-link {
  &:hover {
    .link {
      color: $primary;
    }
  }
}
</style>
