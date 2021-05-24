<template>
  <div class="p-3">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Topic" label-for="topic">
        <b-form-select id="topic" v-model="topic" :options="topics" required></b-form-select>
      </b-form-group>
      <b-form-group label="Title" label-for="title">
        <b-form-input id="title" v-model="title" required></b-form-input>
      </b-form-group>
      <b-form-group label="Problem statement:" label-for="statement">
        <b-form-textarea id="statement" v-model="statement" rows="15" required></b-form-textarea>
      </b-form-group>
      <b-form-group label="Correct solution" label-for="solution">
        <FileSubmit v-model="file" />
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import apiUtil from "@/mixins/apiUtil";
import FileSubmit from "@/components/FileSubmit";

export default {
  name: "CreateProblem",
  mixins: [apiUtil],
  data() {
    return {
      topics: [],
      topic: "",
      title: "",
      statement: "",
      file: null,
    };
  },
  mounted() {
    this.apiGet("/problem-topics").then((result) => {
      this.topics = result || [];
    });
  },
  methods: {
    onSubmit() {
      alert("ok");
    },
  },
  components: { FileSubmit },
};
</script>

<style scoped>
</style>