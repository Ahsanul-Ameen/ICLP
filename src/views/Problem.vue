<template>
  <div class="mx-5 my-3">
    <b-tabs content-class="mt-0 p-4 bg-white shadow">
      <b-tab title="Problem" active :title-item-class="['border-left', 'border-right']">
        <p>I'm the first tab of problem {{id}}</p>
      </b-tab>
      <b-tab title="Submissions" :title-item-class="['border-right']">
        <Submissions :problem_id="id" :user_id="45" />
      </b-tab>
      <b-tab title="Discussions" :title-item-class="['border-right']">
        <p>I'm the second tab of problem {{id}}</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Submissions from "../components/Submissions.vue";

export default {
  name: "Problem",
  props: ["id"],
  data() {
    return {};
  },
  components: {
    Submissions,
  },
};
</script>

<style scoped>
</style>