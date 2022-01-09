<template>
  <b-container class="mt-4">
    <b-icon
      :icon="backIcon"
      class="text-primary"
      font-scale="3"
      @click="$router.go(-1)"
      @mouseover="backIcon = 'arrow-left-circle-fill'"
      @mouseleave="backIcon = 'arrow-left-circle'"
      style="cursor: pointer"
    />
    <h2 class="text-center">
      <b-icon icon="grip-horizontal" class="text-primary" />
      Solo Challenge
      <b-icon icon="grip-horizontal" class="text-primary" />
    </h2>

    <loading :show="!challengeLoaded">
      <h1
        class="text-center mt-5"
        v-if="challengeLoaded && challengeId == null"
      >
        Sorry, no challenge found.
      </h1>
      <div v-else>
        <p class="font-weight-bold">
          <b-icon
            icon="hand-index-thumb"
            class="text-primary"
            rotate="90"
          ></b-icon>
          By clicking on "Start Quiz" button, the quiz will be started on
          selected topic and you have to submit your answer within the time
          limit. Your rank will be updated after your submission or time is
          over.
        </p>
        <challenge-banner>
          <b-container>
            <b-row>
              <b-col class="left">
                <b-row>
                  <p class="font-weight-bold mr-2">
                    <b-icon
                      icon="file-earmark-text"
                      class="text-primary mr-2"
                    />Selected Topic:
                  </p>
                  <p>{{ topicName }}</p>
                </b-row>
                <b-row>
                  <p class="font-weight-bold mr-2">
                    <b-icon icon="box" class="text-primary mr-2" />Total Score:
                  </p>
                  <p>{{ score }}</p>
                </b-row>
                <b-row>
                  <p class="font-weight-bold">
                    <b-icon icon="alarm" class="text-primary mr-2" />Time:
                  </p>
                  <p
                    v-for="time_unit in getTime(time)"
                    :key="time_unit.key"
                    class="ml-2"
                  >
                    {{ time_unit.val }} {{ time_unit.key }}
                  </p>
                </b-row>
              </b-col>
              <b-col align-self="center" class="ml-5">
                <b-row align-h="center">
                  <p class="font-weight-bold mr-2">
                    <b-icon
                      icon="file-earmark-text"
                      class="text-primary mr-2"
                    />Difficulty: {{ difficulty }}
                  </p>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </challenge-banner>
        <b-row align-h="center">
          <b-button
            pill
            variant="primary"
            class="shadow-lg font-weight-bold p-3"
            :to="{
              name: 'SoloChallengeExam',
              params: { challengeId: challengeId },
            }"
            >Start Quiz</b-button
          >
        </b-row>
      </div>
    </loading>
  </b-container>
</template>

<script setup>
import ChallengeBanner from "@/components/Challenges/ChallengeBanner.vue";
import timeUtility from "@/mixins/timeUtility";
import apiUtil from "@/mixins/apiUtil";
import Loading from "@/components/Loading.vue";

export default {
  components: { ChallengeBanner, Loading },
  data() {
    return {
      backIcon: "arrow-left-circle",
      topicId: null,
      topicName: null,
      score: null,
      difficulty: null,
      time: null,
      challengeId: null,
      challengeLoaded: false,
    };
  },
  mixins: [timeUtility, apiUtil],
  created() {
    this.topicId = this.$route.params.topicId;
    this.apiGet(`/mcq/find/${this.topicId}`)
      .then((data) => {
        this.topicName = data.topicName;
        this.score = data.score;
        this.difficulty = data.difficulty;
        this.challengeId = data.challengeId;
        this.time = data.time;
      })
      .finally(() => {
        this.challengeLoaded = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.left {
  border-right: 3px solid blueviolet;
}
</style>
