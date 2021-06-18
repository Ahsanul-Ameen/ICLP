<template>
  <b-container>
    <b-table striped hover :items="ranks">
      <template #cell(user_id)="data">
        <router-link :to="{name: 'Profile', params: {id: data.value}}">{{data.value}}</router-link>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import apiUtil from "@/mixins/apiUtil";
export default {
  name: "Rank",
  props: [],
  mixins: [apiUtil],
  components: {},
  data() {
    return {
      ranks: null,
    };
  },
  mounted() {
    this.apiGet("/public/rank").then((data) => {
      this.ranks = data;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>