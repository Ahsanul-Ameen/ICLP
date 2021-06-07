<template>
  <div>
    <b-list-group>
      <router-link
        :to="topic.name"
        append
        exact
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
        v-for="(topic, index) in topics"
        :key="index"
      >
        <b-list-group-item
          :class="[
            isActive && 'router-link-active',
            isExactActive && 'router-link-exact-active',
            'shadow',
            'hover-zoom',
            'hover-color-link',
            'py-3',
          ]"
          :href="href"
          @click="navigate"
        >
          <div class="link">{{ topic.name }}</div>
        </b-list-group-item>
      </router-link>
    </b-list-group>
  </div>
</template>

<script>
import apiUtil from "@/mixins/apiUtil";
export default {
  name: "ProblemTopics",
  mixins: [apiUtil],
  data: () => ({
    topics: [],
  }),
  mounted() {
    this.apiGet("/public/problem-topics").then((result) => {
      this.topics = result || [];
    });
  },
};
</script>

<style></style>
