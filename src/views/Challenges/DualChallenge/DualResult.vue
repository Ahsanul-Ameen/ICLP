<template>
<!-- sample_test_link: http://localhost:8080/challenges/dualChallenge/result/:1 -->
  <b-container class="mt-4 py-2 px-2" 
    style="background-color: #fafafa; border-radius: 25px;"
  >
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
        Result
      <b-icon icon="grip-horizontal" class="text-primary" />
    </h2>

    <div style="margin-top: 25px;">
      <b-row class="text-center">
        <b-col sm=6>
          <span class="font-weight-bold" style="margin: 25px;">
            <b-icon
            icon="hand-index-thumb"
            class="text-primary"
            rotate="90"
            ></b-icon>
            <!-- TODO: update win/loss xp and emoji status -->
            You lost 45 XP
            <b-icon icon="emoji-frown" aria-hidden="true"></b-icon>
            <!-- emoji-neutral/frown/smile -->
          </span>
        </b-col>
        <b-col>
          <span class="font-weight-bold" style="margin: 25px;">
            <b-icon
            icon="hand-index-thumb"
            class="text-primary"
            rotate="90"
            ></b-icon>
            <!-- TODO: update win/loss status of opponent -->
            {{ challengerName }} won/losed/performed equally
          </span>
        </b-col>	  
      </b-row> 	

      <challenge-banner>
        <b-container>
          <b-row class="text-center">
            <b-col cols="5" class="text-center">
              <p class="font-weight-bold mx-2">
                <b-avatar variant="info" :src="logo"></b-avatar>
                <span class="px-3"> Tintin </span>
              </p>
            </b-col>
            <b-col cols="2">
              <p class="font-weight-bold mx-2 text-left">
                <span class="px-3"> 3:4 </span>
              </p>
            </b-col>
            <b-col cols="5">
              <p class="font-weight-bold mx-2 text-left">
                <b-avatar variant="info" :src="logo"></b-avatar>
                <span class="px-3">Shafin Khadem </span>
              </p>
            </b-col>
          </b-row>

          <b-row class="edged px-5">
            <b-col align-self="center">
              <p class="font-weight-bold mx-2 my-3">
                <b-icon
                  icon="card-checklist"
                  class="text-primary mr-2"
                /> 
                <span class="mx-2"> 3 / 5 </span>
              </p>
            </b-col>

            <b-col align-self="center" class="text-center">
              <p class="font-weight-bold mx-2 my-3">
                <b-icon
                  icon="card-checklist"
                  class="text-primary mr-2"
                /> 
                <span class="mx-2"> 4 / 5 </span>
              </p>
            </b-col>
          </b-row>

          <b-row>
            <b-col 
              align-self="center"
              class="separator"  
            >
              <p 
                class="font-weight-bold ml-4 my-3"
                v-for="(result, index) in results.myResults" :key="index"
              >
                <b-icon
                  icon="cursor"
                  class="text-primary mr-2"
                /> 
                <span class="mx-2"> Q<sub>{{index}}</sub> : </span>
                <b-icon
                  icon="x-square-fill"
                  class="text-primary mr-2"
                  v-if="!result"
                /> 
                <b-icon
                  icon="check2"
                  class="text-primary mr-2"
                  v-else
                /> 
              </p>
            </b-col>
            
            <b-col align-self="center">
              <p 
                class="font-weight-bold mr-4 my-3 text-center"
                v-for="(result, index) in results.opponentResults" :key="index"
              >
                <b-icon
                  icon="cursor"
                  class="text-primary mr-2"
                /> 
                <span class="mx-2"> Q<sub>{{index}}</sub> : </span>
                <b-icon
                  icon="x-square-fill"
                  class="text-primary mr-2"
                  v-if="!result"
                /> 
                <b-icon
                  icon="check2"
                  class="text-primary mr-2"
                  v-else
                /> 
              </p>
            </b-col>
          </b-row>

        </b-container>
      </challenge-banner>
    </div>
  </b-container>
</template>

<script setup>
import ChallengeBanner from "../../../components/Challenges/ChallengeBanner.vue";

export default {
  components: { ChallengeBanner },
  data() {
    return {
      logo: "https://placekitten.com/300/300",
      throwingType: null,
      backIcon: "arrow-left-circle",
      topicId: "",
      topicName: "",
      marks: 76,
      hardness: 80,
      time: 74744,
      challengeId: "",
      challengerName: "Shafin Khadem",
      results: {
        myResults: [true, false, true, true, false],
        opponentResults: [false, true, true, true, true]
      }
    };
  },
  created() {
    this.challengeId = this.$route.params.challengeId;
    //TDOO: adjust these things later with backend?
    this.topicName = "Machine Learning";
    this.challengeId = 22;
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
  .edged {
    border-top: 2px dotted rgb(255, 169, 129);
    border-bottom: 2px dotted rgb(255, 169, 129);
  }
  .separator {
    border-right: 2px dotted rgb(255, 169, 129);
  }
</style>
