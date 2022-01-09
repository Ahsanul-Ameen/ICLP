<template>
  <topics :topiclink="topiclink" header="Coding Challenge" />
</template>

<script>
import Topics from "@/components/Topics.vue";

export default {
  name: "ProblemTopics",
  components: { Topics },
  methods: {
    topiclink(topic) {
      return { name: "Problems", params: { topic: topic.name } };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
