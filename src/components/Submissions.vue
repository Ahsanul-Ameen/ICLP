<template>
  <div>
    problem id: {{problem_id}} user id: {{user_id}}
    <div>
      <b-table striped hover :items="submissions">
        <template #cell(id)="data">
          <a :href="`/submission/${data.value}`">{{data.value}}</a>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Submissions",
  props: ["problem_id", "user_id"],
  data() {
    return {
      submissions: [
        { id: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { id: 21, first_name: "Larsen", last_name: "Shaw" },
        { id: 89, first_name: "Geneva", last_name: "Wilson" },
        { id: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>

<style scoped>
</style>