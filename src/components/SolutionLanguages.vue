<template>
  <b-form-group label="Select program language" :label-for="id">
    <b-form-select
      :id="id"
      :value="value"
      @input="$emit('input', $event)"
      :options="languages"
      required
    />
  </b-form-group>
</template>

<script>
export default {
  name: "SolutionLanguages",
  props: ["value", "id"],
  mixins: [],
  components: {},
  data() {
    return {
      // languages: ["c++ 17", "python3"],
      languages: ["c++ 17"],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>