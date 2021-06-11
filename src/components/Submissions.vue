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
import apiUtil from "@/mixins/apiUtil";

export default {
  name: "Submissions",
  mixins: [thisuser, apiUtil],
  props: ["problemid"],
  data() {
    return {
      submissions: [],
    };
  },
  mounted() {
    this.apiGet(`/public/submissions/${this.problemid}`).then((data) => {
      this.submissions = data;
    });
  },
};
</script>

<style scoped>
</style>