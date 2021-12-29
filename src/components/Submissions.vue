<template>
  <div>
    <loading :show="!submissionsLoaded">
      <b-table striped hover :items="submissions">
        <!-- <template #cell(id)="data">
          <router-link :to="{name: 'Submission', params: {id: data.value}}">{{data.value}}</router-link>
        </template>-->
      </b-table>
    </loading>
    <p :hidden="!(submissionsLoaded && submissions.length==0)">
      This problem has no submission yet.
    </p>
  </div>
</template>

<script>
import thisuser from "@/mixins/thisuser";
import apiUtil from "@/mixins/apiUtil";
import Loading from '@/components/Loading.vue';

export default {
  name: "Submissions",
  mixins: [thisuser, apiUtil],
  components: { Loading },
  props: ["problemid"],
  data() {
    return {
      submissions: [],
      submissionsLoaded: false
    };
  },
  mounted() {
    this.apiGet(`/public/submissions/${this.problemid}`).then((data) => {
      this.submissions = data;
      this.submissionsLoaded = true;
    });
  },
};
</script>

<style lang="scss" scoped>

</style>