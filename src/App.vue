<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
$primary: rgba(253, 89, 60, 255);
$navbar-light-color: rgba(0, 0, 0, 1);
$navbar-light-hover-color: rgba(200, 69, 0, 1);
$navbar-light-active-color: rgba(200, 69, 0, 1);

@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootstrap-vue/src/index.scss";

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
