<template>
  <b-container>
    <h2 class="text-center mt-4">
      <b-icon icon="grip-horizontal" class="text-primary"></b-icon> Select Challenge Category
      <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
    </h2>

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
      >Browse Topics</b-button>
    </challenge-banner>
    <challenge-banner heading="Play">
      <p>
        A dual challenge where you will be able to choose a particular topic and compete against someone interested in same topic.
      </p>
      <b-button
        pill
        variant="primary"
        class="shadow-lg font-weight-bold"
        :to="{ name: 'DualTypes' }"
      >Proceed</b-button>
    </challenge-banner>
    <challenge-banner heading="Coding Challenge">
      <p>
        A coding challenge where you can choose your preferable topic and solve coding problem on it within fixed time limit.
      </p>
      <b-button
        pill
        variant="primary"
        class="shadow-lg font-weight-bold"
        :to="{ name: 'ProblemTopics' }"
      >Browse Topics</b-button>
    </challenge-banner>
  </b-container>
</template>

<script>
import ChallengeBanner from "@/components/Challenges/ChallengeBanner.vue";
export default {
  components: {
    ChallengeBanner,
  },
};
</script>

<style lang="scss" scoped></style>
