<template>
  <b-form-group label="Select program language" label-for="language">
    <b-form-select
      :value="value"
      @input="$emit('input', $event)"
      id="language"
      :options="languages"
      required
    />
  </b-form-group>
</template>

<script>
export default {
  name: "SolutionLanguages",
  props: ["value"],
  mixins: [],
  components: {},
  data() {
    return {
      languages: ["c++ 17", "python3"],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>