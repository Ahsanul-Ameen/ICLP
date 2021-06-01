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
        {{ title }}
        <span style="color: indigo; font-style: italic;"> {{ challengerName ? challengerName : 'Whom?' }} </span>
      <b-icon icon="grip-horizontal" class="text-primary" />
    </h2>

    <div v-if="topicName.length == 0 || !challengerName || challengerName.length == 0" style="margin-top: 25px;">
      <span style="color: red;"> Link is broken </span>
      <b-button @click="$router.go(-1)">Go Back</b-button>
    </div>
    <div v-else style="margin-top: 25px;">
      <p class="font-weight-bold" style="margin-left: 25px;" v-if="throwingType">
        <b-icon
          icon="hand-index-thumb"
          class="text-primary"
          rotate="90"
        ></b-icon>
        The challenge will start shortly after your opponent accepts...
      </p>
      <p class="font-weight-bold" style="margin-left: 25px;" v-else>
        <b-icon
          icon="hand-index-thumb"
          class="text-primary"
          rotate="90"
        ></b-icon>
        By clicking on "Start Quiz" button, the quiz will be started on selected
        topic and you have to submit your answer within the time limit.
      </p>

      <p class="font-weight-bold" style="margin-left: 25px;">
        <b-icon
          icon="hand-index-thumb"
          class="text-primary"
          rotate="90"
        ></b-icon>
        Your rank will be updated according to the performance of your opponent.
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
        <b-card
          style="max-width: 70rem;"
					tag="article"
					class="mx-auto px-auto place hover-zoom"
          v-bind:class="{ start: throwingType, accept: !throwingType }"
				>	
					<b-card-text 
            class="pb-2 pl-4 pt-2"
            v-if="throwingType"
          >
						<span style="color: brown; font-size: 20px">Challenge will shortly start after acceptance of you opponent</span>
					</b-card-text>
          <b-button
            v-if="throwingType"
            pill
            variant="primary"
            class="shadow-lg font-weight-bold p-3 ml-4"
            @click.prevent="$router.go(-1)"
          >
            {{ button }}
          </b-button>
          <b-button
            v-else
            pill
            variant="primary"
            class="shadow-lg font-weight-bold p-3"
            :to="{  //TODO: redirect to a dual exam 
              name: 'DualExam',
              params: { challengeId: challengeId },
            }"
          >
            {{ button }}
          </b-button>
				</b-card>

        
      </b-row>
    </div>
  </b-container>
</template>

<script setup>
import ChallengeBanner from "@/components/Challenges/ChallengeBanner.vue";
import timeUtility from "@/mixins/timeUtility";
export default {
  components: { ChallengeBanner },
  data() {
    return {
      throwingType: null,
      backIcon: "arrow-left-circle",
      topicId: "",
      topicName: "",
      marks: 76,
      hardness: 80,
      time: 74744,
      challengeId: "",
      challengerName: "",
    };
  },
  mixins: [timeUtility],
  created() {
    this.throwingType = this.$route.params.throwingType;
    this.topicId = this.$route.params.topicId;
    this.challengerName = this.$route.params.challengerName;
    //TDOO: adjust these things later with backend?
    this.topicName = "Machine Learning";
    this.challengeId = Math.floor(Math.random() * 10 + 1);
  },
  computed: {
    title() {
      return this.throwingType ? 'Arranging a dual with' : 'Accept a Challenge with'
    },
    button() {
      return this.throwingType ? 'Cancel' : 'Start Dual'
    }
  }
};
</script>

<style lang="scss" scoped>
  .left {
    border-right: 3px solid blueviolet;
  }
  .start {
    background-color: rgb(255, 246, 239);
  }
  .accept {
    background-color: rgb(255, 235, 235);
    border: 1px;
    border-radius: 25px;
  }
</style>
