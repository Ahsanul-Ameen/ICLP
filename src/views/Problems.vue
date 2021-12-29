<template>
  <div>
    <h1>{{topic}}</h1>
    <loading :show="!problemsLoaded">
      <b-row>
        <b-col cols="12" lg="9">
          <b-list-group>
            <b-list-group-item
              v-for="problem in problems"
              :key="problem.id"
              :probleminfo="problem"
              :to=" { name: 'Problem', params: {id: problem.id } }"
              class="shadow hover-zoom hover-color-link py-3"
            >
              <ProblemIntro :probleminfo="problem" />
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <!-- TODO: implement the filers and pagination -->
        <!-- <b-col cols="3" class="d-none d-lg-block">
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
        </b-col>-->
      </b-row>
    </loading>
    <p :hidden="!(problemsLoaded && problems.length==0)">
      This topic has no problem yet.
    </p>
  </div>
</template>

<script>
import ProblemIntro from "@/components/ProblemIntro";
import apiUtil from "@/mixins/apiUtil";
import thisuser from "@/mixins/thisuser";
import Loading from '@/components/Loading.vue';

export default {
  name: "Problems",
  mixins: [apiUtil, thisuser],
  props: ["topic", "solved", "unsolved", "easy", "medium", "hard"],
  components: {
    ProblemIntro,
    Loading
  },
  data: (vm) => ({
    problems: [],
    problemsLoaded: false,
    filters: [
      {
        type: "Status",
        values: [
          {
            label: "solved",
            active: vm.solved,
          },
          {
            label: "unsolved",
            active: vm.unsolved,
          },
        ],
      },
      {
        type: "Difficulty",
        values: [
          {
            label: "easy",
            active: vm.easy,
          },
          {
            label: "medium",
            active: vm.medium,
          },
          {
            label: "hard",
            active: vm.hard,
          },
        ],
      },
    ],
  }),
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
    userid: {
      handler(val) {
        this.getScore(val);
      },
    },
  },
  mounted() {
    this.getScore(this.userid);
  },
  methods: {
    getScore(val) {
      this.apiGet(`/public/problems/${this.topic}?userid=${val}`).then(
        (data) => {
          this.problems = data;
          this.problemsLoaded = true;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.filtertype {
  color: grey;
  padding: 3px;
}
.filtervalue {
  padding: 3px;
}
</style>

// NOTE: router-link exact should be default but isn't, use append for relative link 
//      , relative link doesn't work correctly with href
// FIXME: navbar color doesn't change when using keyboard to go back
