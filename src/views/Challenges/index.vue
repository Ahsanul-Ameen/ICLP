<template>
  <div>
    <div class="text-center mt-4">
      <h2>
        <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
        Select Challenge Category
        <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
      </h2>
    </div>

    <challenge-banner heading="Take a quiz">
      <p>
        A solo challenge where you can choose your preferable topic and perform
        a quiz based on that topic.
      </p>
      <b-button
        pill
        variant="primary"
        class="shadow-lg font-weight-bold"
        :to="{ name: 'BrowseTopics' }"
        >Browse Topics</b-button
      >
    </challenge-banner>
    <challenge-banner heading="Play"></challenge-banner>
    <challenge-banner heading="Coding Challenge"></challenge-banner>
  </div>
</template>

<script>
import ChallengeBanner from "../../components/Challenges/ChallengeBanner.vue";
export default {
  components: {
    ChallengeBanner,
  },
};
</script>

<style lang="scss" scoped></style>
