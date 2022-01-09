<template>
  <b-list-group-item :to="to" class="shadow hover-zoom hover-color-link py-3">
    <slot></slot>
  </b-list-group-item>
</template>

<script>
export default {
  props: ["to"],
};
</script>

<style>
</style>