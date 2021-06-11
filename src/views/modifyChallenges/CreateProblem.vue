<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Topic" label-for="topic">
        <b-select id="topic" v-model="topicid" :options="topics" required />
      </b-form-group>
      <b-form-group label="Title" label-for="title">
        <b-input id="title" v-model="title" required />
      </b-form-group>
      <b-form-group label="Problem statement:" label-for="statement">
        <b-textarea id="statement" v-model="statement" rows="8" required />
      </b-form-group>
      <b-form-group label="Difficulty" label-for="difficulty">
        <b-select id="difficulty" v-model="difficulty" :options="difficulties" required />
      </b-form-group>
      <b-form-group label="Score" label-for="score">
        <b-input type="number" id="score" v-model="score" min="5" max="100" step="5" required />
      </b-form-group>
      <div>
        Tests:
        <b-list-group>
          <b-list-group-item v-for="(test, index) in tests" :key="index">
            <b-form-group :label="`Test ${index}`" :label-for="`test_${index}`">
              <b-textarea :id="`test_${index}`" v-model="tests[index]" rows="5" required />
            </b-form-group>
          </b-list-group-item>
        </b-list-group>
        <b-button @click="addTest">Add test</b-button>
        <b-form-group label="Checker executable for linux" label-for="checker">
          <FileSubmit id="checker" v-model="checker" />
        </b-form-group>
      </div>
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
      difficulties: ["easy", "medium", "hard"],
      topicid: 1,
      title: "dummy",
      statement: `
      you will be given an integer n (1 < n < 100) as input. output n*5.
      `,
      checker: null,
      difficulty: "easy",
      score: 5,
      tests: ["3", "5"],
    };
  },
  mounted() {
    this.apiGet("/public/problem-topics").then((result) => {
      this.topics = result.map((a) => ({ value: a.id, text: a.name })) || [];
    });
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      formData.append("topicid", this.topicid);
      formData.append("title", this.title);
      formData.append("statement", this.statement);
      formData.append("difficulty", this.difficulty);
      formData.append("score", this.score);
      formData.append("tests", this.tests);
      formData.append("checker", this.checker);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      this.apiPost("/admin/create-problem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(([data]) => {
        alert(`problem created with id: ${data.id}`);
      });
    },
    addTest() {
      this.tests.push("");
    },
  },
  components: { FileSubmit },
};
</script>

<style scoped>
</style>