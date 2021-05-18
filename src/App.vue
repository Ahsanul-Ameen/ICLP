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
</style>
