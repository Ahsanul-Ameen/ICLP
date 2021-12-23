<template>
  <b-container>
    <h1 class="pb-5">Welcome to Admin's Dashboard</h1>
    <b-card-group deck>
      <router-link :to="{ name: 'AddQuiz' }">
        <b-card border-variant="primary" class="p-3">
          <b-row align-h="center">
            <b-icon icon="patch-question" class="display-4"></b-icon>
          </b-row>
          <b-row align-h="center" class="mt-2">Add A Quiz</b-row>
        </b-card>
      </router-link>
      <router-link :to="{ name: 'CreateProblem' }">
        <b-card border-variant="primary" class="p-3">
          <b-row align-h="center">
            <b-icon icon="code-square" class="display-4"></b-icon>
          </b-row>
          <b-row align-h="center" class="mt-2">Add Coding Challenge</b-row>
        </b-card>
      </router-link>
    </b-card-group>
  </b-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
