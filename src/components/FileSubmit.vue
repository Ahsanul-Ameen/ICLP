<template>
  <div>
    <b-form-file
      :value="value"
      @input="$emit('input', $event)"
      :state="Boolean(value)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      required
    ></b-form-file>
    <div class="mt-3">Selected file: {{ value ? value.name : '' }}</div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
</style>