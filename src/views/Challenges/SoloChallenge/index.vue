<template>
  <topics :topiclink="topiclink" header="Solo Challenge" />
</template>

<script>
import Topics from "@/components/Topics.vue";

export default {
  components: { Topics },
  methods: {
    topiclink(topic) {
      return { name: "SoloChallengeConfirm", params: { topicId: topic.id } };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
