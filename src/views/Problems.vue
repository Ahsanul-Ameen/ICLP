<template>
  <div class="mx-5 my-3">
    <h1>{{topic}}</h1>
    <b-row>
      <b-col cols="12" lg="10">
        <b-list-group>
          <b-list-group-item
            v-for="problem in problems"
            :key="problem.id"
            :probleminfo="problem"
            :href="`/problem/${problem.id}`"
            class="shadow hover-zoom hover-color-link py-3"
          >
            <ProblemIntro :probleminfo="problem" />
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="2" class="d-none d-lg-block">
        <b-list-group flush>
          <b-list-group-item v-for="(filter, index) in filters" :key="index" class="default-bg">
            <div class="filtertype">{{filter.type}}</div>
            <div
              class="form-check filtervalue"
              v-for="(filtervalue, index) in filter.values"
              :key="index"
            >
              <input
                type="checkbox"
                :value="filtervalue.label"
                :id="index"
                class="form-check-input"
                v-model="filtervalue.active"
              />
              <label :for="index" class="form-check-label">{{filtervalue.label}}</label>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProblemIntro from "../components/ProblemIntro.vue";

export default {
  name: "Problems",
  props: {
    topic: String,
    solved: {
      type: String,
      default: "false",
    },
    unsolved: {
      type: String,
      default: "false",
    },
    easy: {
      type: String,
      default: "false",
    },
    medium: {
      type: String,
      default: "false",
    },
    hard: {
      type: String,
      default: "false",
    },
  },
  components: {
    ProblemIntro,
  },
  data: (vm) => ({
    problems: [
      {
        id: 5,
        name: "Loops",
        difficulty: "Easy",
        maxScore: 10,
        solvedBy: 1,
        attemptedBy: 2,
        solved: true,
      },
      {
        id: 8,
        name: "Array",
        difficulty: "Medium",
        maxScore: 15,
        solvedBy: 1,
        attemptedBy: 3,
        solved: false,
      },
    ],
    filters: [
      {
        type: "Status",
        values: [
          {
            label: "solved",
            active: vm.solved == "true",
          },
          {
            label: "unsolved",
            active: vm.unsolved == "true",
          },
        ],
      },
      {
        type: "Difficulty",
        values: [
          {
            label: "easy",
            active: vm.easy == "true",
          },
          {
            label: "medium",
            active: vm.medium == "true",
          },
          {
            label: "hard",
            active: vm.hard == "true",
          },
        ],
      },
    ],
  }),
  computed: {},
  watch: {
    filters: {
      handler(val) {
        var filterparams = {};
        val.forEach((filter) => {
          filter.values.forEach((value) => {
            filterparams[value.label] = value.active;
          });
        });
        this.$router.push({ query: filterparams });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.filtertype {
  color: grey;
  padding: 3px;
}
.filtervalue {
  padding: 3px;
}
</style>

// NOTE: router-link :exact="true" should be default but isn't, use append for relative link
// TODO: add current navigating path at top to go back easily