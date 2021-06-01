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
axios.defaults.baseURL = "http://localhost:5000";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
$primary: rgba(253, 89, 60, 255);
$dark: rgba(0, 0, 0, 1);
$navbar-light-color: rgba(0, 0, 0, 1);
$navbar-light-hover-color: rgba(200, 69, 0, 1);
$navbar-light-active-color: rgba(200, 69, 0, 1);

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
}

.default-bg {
  background-color: #f3f7f7;
}
body {
  @extend .default-bg;
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
