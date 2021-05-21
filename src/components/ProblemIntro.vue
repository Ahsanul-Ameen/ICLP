<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h3 class="link">{{probleminfo.name}}</h3>
        {{probleminfo.difficulty}}, Max score: {{probleminfo.maxScore}}, Solved by: {{probleminfo.solvedBy}}, Attempted by: {{probleminfo.attemptedBy}}
      </b-col>
      <b-col cols="3" class="align-self-center">
        <!-- .row is display:flex; flex-direction:row  -->
        <b-card no-body class="solvecard">
          <b-card-body
            class="p-2 d-flex justify-content-center solve"
            :class="{solved: probleminfo.solved}"
          >{{probleminfo.solved ? "Solved" : "Solve challenge"}}</b-card-body>
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
.solvecard {
  border-color: green;
}
.solve {
  color: green;
  &.solved {
    background-color: #1ba94c;
    color: white;
  }
}
</style>