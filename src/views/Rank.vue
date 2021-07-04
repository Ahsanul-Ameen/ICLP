<template>
  <b-container>
    <b-form-input v-model="search" placeholder="Search"></b-form-input>
    <b-table
      id="rank-table"
      striped
      hover
      :items="ranksFiltered"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(user_id)="data">
        <router-link :to="{ name: 'Profile', params: { id: data.value } }">{{
          data.value
        }}</router-link>
      </template>
    </b-table>
    <b-row align-h="end">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="rank-table"
        pills
      ></b-pagination>
    </b-row>
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
      perPage: 10,
      currentPage: 1,
      search: "",
      ranks: [],
    };
  },
  mounted() {
    this.apiGet("/public/rank").then((data) => {
      this.ranks = data;
    });
  },
  computed: {
    ranksFiltered() {
      return this.ranks.filter((item) => {
        if (this.search.length == 0) return true;
        return item.name.includes(this.search);
      });
    },
    rows() {
      return this.ranksFiltered.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>
