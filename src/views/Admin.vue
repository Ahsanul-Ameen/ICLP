<template>
  <b-container>
    <!-- TODO: verify adminship before letting in this page -->
    <h1 class="pb-5">Welcome to admin's panel</h1>
    <b-row>
      <router-link :to="{ name: 'CreateProblem' }">Create problem</router-link>
    </b-row>
    <b-row>
      <router-link :to="{ name: 'AddQuiz' }">Add a quiz</router-link>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
