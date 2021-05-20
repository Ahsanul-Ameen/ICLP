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

@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootstrap-vue/src/index.scss";

.default-bg {
  background-color: #f3f7f7;
}
body {
  @extend .default-bg;
}
.floating-effect {
  background-color: white;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
}
.clickable-card {
  @extend .floating-effect;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
}
</style>
