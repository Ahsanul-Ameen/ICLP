<template>
<!-- sample_test_link: http://localhost:8080/challenges/dual/result/:1 -->
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
        {{title}}
      <b-icon icon="grip-horizontal" class="text-primary" />
    </h2>
    <hr>
    <div style="margin-top: 25px;">
      <b-row class="text-center">
        <b-col sm=6>
          <span class="font-weight-bold" style="margin: 25px;">
            <b-icon
            icon="hand-index-thumb"
            class="text-primary"
            rotate="90"
            ></b-icon>
            <span style="color: magenta;"> You gained {{ myScore }} xp </span>
            <!-- <b-icon icon="emoji-frown" aria-hidden="true"></b-icon> -->
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
            <span style="color: brown;"> {{ opponentName }} gained {{ opponentScore }} xp </span>
          </span>
        </b-col>	  
      </b-row> 	
      <b-row class="text-center">
        <b-col mt-3 class="edged">
          <span style="color: rgb(181, 60, 20); font-size: 150%"> Status :  {{ winningStatus }} </span>
        </b-col>	  
      </b-row> 	
      <challenge-banner>
        <b-container>
          <b-row class="text-center">
            <b-col cols="5" class="text-center">
              <p class="font-weight-bold mx-2">
                <b-avatar variant="info" :src="logo"></b-avatar>
                <!-- <span class="px-3"> {{ myName }} </span> -->
                <b-badge mt-2 :to="{ name: 'Profile', params: { id: myId } }" variant="light">
                  <span style="color: blue"> {{ myName }} </span>
                </b-badge>
              </p>
            </b-col>
            <b-col cols="2">
              <p class="font-weight-bold mx-2 text-left">
                <span class="px-3"> {{ results.myResults.filter(Boolean).length }} : {{ results.opponentResults.filter(Boolean).length }} </span>
              </p>
            </b-col>
            <b-col cols="5">
              <p class="font-weight-bold mx-2 text-left">
                <b-avatar variant="info" :src="logo"></b-avatar>
                <!-- <span class="px-3"> {{ opponentName }}</span> -->
                <b-badge mt-2 :to="{ name: 'Profile', params: { id: opponentId } }" variant="light">
                  <span style="color: blue"> {{ opponentName }} </span>
                </b-badge>
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
                <span class="mx-2"> {{ results.myResults.filter(Boolean).length }} / {{ results.myResults.length }} </span>
              </p>
            </b-col>

            <b-col align-self="center" class="text-center">
              <p class="font-weight-bold mx-2 my-3">
                <b-icon
                  icon="card-checklist"
                  class="text-primary mr-2"
                /> 
                <span class="mx-2"> {{ results.opponentResults.filter(Boolean).length }} / {{ results.opponentResults.length }} </span>
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
                v-bind:class="[{ correct: result }, { incorrect: !result }]"
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
                v-bind:class="[{ correct: result }, { incorrect: !result }]"
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
    <hr>
  </b-container>
</template>

<script setup>
import ChallengeBanner from "@/components/Challenges/ChallengeBanner.vue";
import thisuser from "@/mixins/thisuser";
import apiUtil from '@/mixins/apiUtil';

export default {
  components: { ChallengeBanner },
  data() {
    return {
      logo: "https://placekitten.com/300/300", // default
      throwingType: null,
      backIcon: "arrow-left-circle",
      title: "",
      myId: null,
      myName: null,
      myScore: null,
      opponentId: null,
      opponentName: "Shafin Khadem",
      opponentScore: null,
      examId: null,
      myAnswer: null,
      opponentAnswer: null,
      results: {
        myResults: [],
        opponentResults: []
      }
    };
  },
  methods: {
    printJsonArray(jarray) {
			console.log("-----printing json array---------");
			for (var i = 0; i < jarray.length; i++) {
				console.log( jarray[i] );
			}
			console.log("---------------------------------");
		},
    getResult(question_answer_set, submission) {
      var result = [];
      for ( let i = 0; i < Math.min(question_answer_set.length, submission.length); i++) {
        if (submission[i] == null) continue;
        if (question_answer_set[i].type === 1) {
            if (submission[i] == question_answer_set[i].answer)
                result.push(true);
            else result.push(false);
        } else {
            submission[i].sort();
            question_answer_set[i].answer.sort();
            
            if (submission[i].length === question_answer_set[i].answer.length ) {
                let j = 0;
                for (; j < submission[i].length; j++) {
                    if (submission[i][j] != question_answer_set[i].answer[j])
                        break;
                }
                if (j === submission[i].length)
                    result.push(true);
                else result.push(false);
            } else {
              result.push(false);
            }
        }
      }
      return result;
    },
    fetchResult(user_id) {
			console.log("fetching result...");
			this.apiGet(`/dual/result?examId=${this.examId}`)
			.then((data) => {
        if(data.length !== 2) {
          this.$root.$bvToast.toast(`Data length should be 2`, {
            title: "Error in fetching result",
            variant: "danger",
            autoHideDelay: 3000,
            appendToast: true,
          });
        } else {
          if(user_id !== data[0].participant_id) {
            [data[0], data[1]] = [data[1], data[0]]; // swap records
          }
          this.title = data[0].problem_title;
          this.myName = data[0].participant_name;
          this.myScore = data[0].participant_mark;
          this.myAnswer = JSON.parse(data[0].participant_submission);
          this.opponentName = data[1].participant_name;
          this.opponentScore = data[1].participant_mark;
          this.opponentAnswer = JSON.parse(data[1].participant_submission);
          var question_answer_set = JSON.parse(data[0].question_answer_set).questions;
         
          // console.log(question_answer_set);
          // console.log(this.myAnswer);
          // console.log(this.opponentAnswer);

          this.results.myResults = this.getResult(question_answer_set, this.myAnswer);
          this.results.opponentResults = this.getResult(question_answer_set, this.opponentAnswer);

          if(this.results.myResults.length !== this.results.opponentResults.length) {
            this.$root.$bvToast.toast(`Error in showing result data`, {
              title: "results arrays should have same length",
              variant: "danger",
              autoHideDelay: 2000,
              appendToast: true,
            });
          }
          console.log(this.results);
        }
			});
    }  
  },
  created() {
    this.examId = this.$route.params.examId;
    this.myId = this.userid;
    this.opponentId = (this.myId === this.$route.params.idOne) ? this.$route.params.idTwo : this.$route.params.idOne;
    this.fetchResult(this.userid);
  },
  mixins: [thisuser, apiUtil],
  computed: {
    winningStatus() {
      if(this.myScore === this.opponentScore) {
        return "Match tied";
      } else if (this.myScore > this.opponentScore) {
        return "You won! :)";
      } else {
        return "You lost!";
      }
    }
  }
};

</script>

<style lang="scss" scoped>
  .edged {
    border-top: 2px dotted rgb(255, 169, 129);
    border-bottom: 2px dotted rgb(255, 169, 129);
    margin: 10px;
  }
  .separator {
    border-right: 2px dotted rgb(255, 169, 129);
  }
  .correct {
    background-color: rgb(239, 248, 224);
  }
  .incorrect {
    background-color: rgb(250, 235, 228);
  }
</style>
