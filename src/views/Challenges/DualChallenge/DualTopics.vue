<template>
  <topics :topiclink="topiclink" header="Dual Challenge" />
</template>

<script>
import Topics from "@/components/Topics.vue";

export default {
  components: { Topics },
  methods: {
    topiclink(topic) {
      return {
        name: "Duellers",
        params: {
          topicId: topic.id,
          topicName: topic.name,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
