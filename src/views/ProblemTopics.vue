<template>
  <div class="mx-5 my-3">
    <b-list-group>
      <router-link
        :to="topic"
        append
        exact="true"
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
        v-for="(topic, index) in topics"
        :key="index"
      >
        <b-list-group-item
          :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'problemcard', 'clickable-card', 'py-3']"
          :href="href"
          @click="navigate"
        >{{ topic }}</b-list-group-item>
      </router-link>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "ProblemTopics",
  data: () => ({
    topics: ["python", "c++"],
  }),
};
</script>

<style>
</style>