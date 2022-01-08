<template>
  <div>
    <b-row>
      <b-col cols="12" sm="9">
        <h3 class="link">{{ probleminfo.title }}</h3>
        {{ probleminfo.difficulty }}, Max score: {{ probleminfo.max_score }},
        Your score: {{ probleminfo.score }}
      </b-col>
      <b-col cols="12" sm="3" class="align-self-center">
        <!-- .row is display:flex; flex-direction:row  -->
        <b-card no-body class="solvecard">
          <b-card-body
            class="p-2 d-flex justify-content-center solve"
            :class="{ solved: probleminfo.score === probleminfo.max_score }"
            >{{
              probleminfo.score === probleminfo.max_score ? "Solved" : "Solve"
            }}</b-card-body
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "ProblemIntro",
  props: ["probleminfo"],
};
</script>

<style scoped lang="scss">
@import "@/styles/bootstrap_colors.scss";

.solvecard {
  border-color: $primary;
}
.solve {
  color: $primary;
  &.solved {
    background-color: $primary;
    color: white;
  }
}
</style>