<template>
  <div>
    <b-form-file
      :id="id"
      :value="value"
      @input="$emit('input', $event)"
      :state="Boolean(value)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      required
    />
    <div class="mt-3">Selected file: {{ value ? value.name : '' }}</div>
  </div>
</template>

<script>
export default {
  props: ["value", "id"],
};
</script>

<style scoped>
</style>