<template>
  <b-container>
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
        <deletable-card
          @delete-card="deleteTest(index)"
          class="mb-2"
          v-for="(test, index) in tests"
          :key="index"
        >
          <p>Test {{index}}</p>
          <b-form-group :label="`input`" :label-for="`test_${index}_input`">
            <b-textarea :id="`test_${index}_input`" v-model="tests[index].input" rows="5" required />
          </b-form-group>
          <b-form-group :label="`output`" :label-for="`test_${index}_output`">
            <b-textarea
              :id="`test_${index}_output`"
              v-model="tests[index].output"
              rows="5"
              required
            />
          </b-form-group>
        </deletable-card>
        <b-button class="my-4" @click="addTest">Add test</b-button>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import apiUtil from "@/mixins/apiUtil";
import DeletableCard from "@/components/DeletableCard.vue";

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
      difficulty: "easy",
      score: 5,
      tests: [
        { input: "3", output: "15\n" },
        { input: "5", output: "25\n" },
      ],
    };
  },
  mounted() {
    this.apiGet("/public/problem-topics").then((result) => {
      this.topics = result.map((a) => ({ value: a.id, text: a.name })) || [];
    });
  },
  methods: {
    onSubmit() {
      let body = {};
      body.topicid = this.topicid;
      body.title = this.title;
      body.content = {
        statement: this.statement,
        tests: this.tests,
      };
      body.difficulty = this.difficulty;
      body.score = this.score;
      this.apiPost("/admin/create-problem", body, {})
        .then(([{ id }]) => {
          this.$root.$bvToast.toast(`problem created with id: ${id}`, {
            variant: "success",
            noCloseButton: true,
          });
          this.$router.push({ name: "Admin" });
        })
        .catch(() => {
          this.$root.$bvToast.toast(
            "Question set submission unsuccessful. Try again.",
            {
              variant: "danger",
              noCloseButton: true,
            }
          );
        });
    },
    addTest() {
      this.tests.push({});
    },
    deleteTest(index) {
      this.tests.splice(index, 1);
    },
  },
  components: { DeletableCard },
};
</script>

<style scoped></style>
