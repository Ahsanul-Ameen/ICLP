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
    <div v-if="topicName.length == 0">
      Link is broken
      <b-button @click="$router.go(-1)">Go Back</b-button>
    </div>
    <div v-else>
      <p class="font-weight-bold">
        By clicking on "Start Quiz" button, the quiz will be started on selected
        topic and you have to submit your answer within the time limit. Your
        rank will be updated after your submission or time is over.
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
                  <b-icon icon="box" class="text-primary mr-2" />Total Marks:
                </p>
                <p>{{ marks }}</p>
              </b-row>
              <b-row>
                <p class="font-weight-bold">
                  <b-icon icon="alarm" class="text-primary mr-2" />Time:
                </p>
                <p v-if="parseInt(getHours(time)) != 0" class="ml-2">
                  {{ parseInt(getHours(time)) }} hr
                </p>
                <p v-if="parseInt(getMinutes(time)) != 0" class="ml-2">
                  {{ parseInt(getMinutes(time)) }} min
                </p>
                <p v-if="parseInt(getSeconds(time)) != 0" class="ml-2">
                  {{ parseInt(getSeconds(time)) }} sec
                </p>
              </b-row>
            </b-col>
            <b-col align-self="center" class="ml-5">
              <b-row align-h="center">
                <p class="font-weight-bold mr-2">
                  <b-icon
                    icon="file-earmark-text"
                    class="text-primary mr-2"
                  />Hardness: {{ hardness }}%
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
  </b-container>
</template>

<script setup>
import ChallengeBanner from "../../../components/Challenges/ChallengeBanner.vue";
import timeUtility from "../../../mixins/timeUtility";
export default {
  components: { ChallengeBanner },
  data() {
    return {
      backIcon: "arrow-left-circle",
      topicId: "",
      topicName: "",
      marks: 76,
      hardness: 80,
      time: 74744,
      challengeId: "",
    };
  },
  mixins: [timeUtility],
  created() {
    this.topicId = this.$route.params.topicId;
    this.topicName = "Machine Learning";
    this.challengeId = 22;
  },
};
</script>

<style lang="scss" scoped>
.left {
  border-right: 3px solid blueviolet;
}
</style>
