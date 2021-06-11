<template>
  <div>
    problem id: {{problemid}}, current user id: {{userid}}
    <div>
      <b-table striped hover :items="submissions">
        <template #cell(id)="data">
          <router-link :to="{name: 'Submission', params: {id: data.value}}">{{data.value}}</router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import thisuser from "@/mixins/thisuser";

export default {
  name: "Submissions",
  mixins: [thisuser],
  props: ["problemid"],
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