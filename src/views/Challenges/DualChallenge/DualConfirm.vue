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
        <b-badge :to="{ name: 'Profile', params: { id: `${challengerId}` } }" target="_blank" variant="light">
          <span style="color: blue"> {{ challengerName }} </span>
        </b-badge>
        <span style="color: indigo; font-style: italic;"> vs </span>
        <b-badge :to="{ name: 'Profile', params: { id: `${challengeeId}` } }" target="_blank" variant="light">
          <span style="color: blue"> {{ challengeeName }} </span>
        </b-badge>
      <b-icon icon="grip-horizontal" class="text-primary" />
    </h2>

    <div v-if="!topicName || !challengerName || !challengerName" style="margin-top: 25px;">
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
        The challenge could be started shortly after your opponent accepts...
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
        Your rank will be updated according to the performance of you and your opponent.
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
                  />Hardness: {{ difficulty }}
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
						<span style="color: brown; font-size: 20px">Confirm your invitation. You'll be redirected to the notifications pane. 
              Don't forget to refresh for checking the status...
            </span>
					</b-card-text>
          <b-button
            v-if="throwingType"
            pill
            variant="primary"
            class="shadow-lg font-weight-bold m-5 p-3"
            @click.prevent="sendInvitation" 
            :to="{  //redirects to notification pane (sending invitation)
              name: 'ToDo',
              params: {},
            }"
          >
            {{ button }}
          </b-button>
          <b-button
            v-else-if="status === 'pending'"
            pill
            variant="success"
            class="shadow-lg font-weight-bold m-5 p-3"
            @click.prevent="updateInvitation('accept')" 
            :to="{  //redirects to a dual exam (accepting)
              name: 'DualExam',
              params: { examId: examId, challengeId: challengeId, },
            }"
          >
            {{ button }}
          </b-button>
          <b-button
            v-else
            pill
            variant="success"
            class="shadow-lg font-weight-bold m-5 p-3"
            :to="{  //redirects to a dual exam (full_completing)
              name: 'DualExam',
              params: { examId: examId, challengeId: challengeId, },
            }"
          >
            {{ button }}
          </b-button>
          <b-button
            v-if="throwingType === false && status === 'pending'"
            pill
            variant="danger"
            class="shadow-lg font-weight-bold m-5 p-3"
            @click.prevent="updateInvitation('reject')" 
            :to="{  //redirects to notification pane (rejecting)
              name: 'ToDo',
              params: {},
            }"
          >
            reject
          </b-button>
				</b-card>
      </b-row>
    </div>
  </b-container>
</template>

<script setup>
import ChallengeBanner from "@/components/Challenges/ChallengeBanner.vue";
import timeUtility from "@/mixins/timeUtility";
import apiUtil from "@/mixins/apiUtil";
export default {
  components: { ChallengeBanner },
  data() {
    return {
      throwingType: null,
      backIcon: "arrow-left-circle",
      topicId: null,
      topicName: null,
      marks: null,
      difficulty: null,
      time: null,
      challengerId: null,
      challengerName: null,
      challengeeId: null,
      challengeeName: null,
      challengeId: null, // this is important
      examId: null, // required during accepting invitations,
      status: null // required during processing challenge
    };
  },
  mixins: [timeUtility, apiUtil],
  created() {
    this.topicId = this.$route.params.topicId;
    this.topicName = this.$route.params.topicName;
    this.challengerName = this.$route.params.challengerName;
    this.challengerId = this.$route.params.challengerId;
    this.challengeeName = this.$route.params.challengeeName;
    this.challengeeId = this.$route.params.challengeeId;
    this.throwingType = this.$route.params.throwingType;
    this.examId = this.$route.params.examId;
    this.status = this.$route.params.status;
  },
  mounted() {
    if (this.throwingType === true) {
      this.apiGet(`/mcq/find/${this.topicId}`).then((data) => {
        this.marks = data.marks;
        this.difficulty = data.difficulty;
        this.challengeId = data.challengeId;
        this.time = data.time;
      });
    } else if(this.throwingType === false) {
      this.apiGet(`/mcq/find2/${this.examId}`).then((data) => {
        this.marks = data.marks;
        this.difficulty = data.difficulty;
        this.challengeId = data.challengeId;
        this.time = data.time;
      });
    }
    
  },
  computed: {
    title() {
      return this.throwingType ? 'Arranging a dual with' : 'Accept a Challenge with'
    },
    button() {
      return this.throwingType ? 'Invite' : 'Start'
    },
    opponentName() {
      if(this.throwingType === true) {
        return this.challengeeName ? this.challengeeName : 'Whom?'
      } else {
        return this.challengerName ? this.challengerName : 'Whom?'
      }
    },
    opponentId() {
      if(this.throwingType === true) {
        return this.challengeeId ? this.challengeeId : 0
      } else {
        return this.challengerId ? this.challengerId : 0
      }
    }
  },
  methods: {
    sendInvitation() {
      let body = {
        "challengerId" : this.challengerId,
        "challengeeId": this.challengeeId,
        "topicId": this.topicId,
        "challengeId": this.challengeId
      };
      console.log(JSON.stringify(body));
      console.log("invitation sending with above dataset");

      this.apiPostPromise("/dual/invite", body)
      .then(() => {
        //alert(`Invitations sent to: ${this.challengeeName}`);
        this.$root.$bvToast.toast(`Invitations sent to: ${this.challengeeName}`, {
          variant: "success",
          autoHideDelay: 2000,
          appendToast: true,
          noCloseButton: true,
          toaster: "b-toaster-top-center",
        });
      })
      .catch (() => {
        this.$root.$bvToast.toast("ERROR! Try again...", {
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true,
          noCloseButton: true,
          toaster: "b-toaster-top-center",
        });
      });
    },
    updateInvitation(nextStatus) { // accept or reject a message
      if(!this.examId) {
        alert(`Error in invitation: no examId found!`);
      }
      let body = {
        "examId" : this.examId
      };
      console.log(JSON.stringify(body));
      console.log("invitation of ", this.challengerName, " on ", this.topicName, " :: -> ", nextStatus);
      this.apiPostPromise(`/dual/${nextStatus}`, body)
      .then(() => {
        //alert(`Invitations of ${this.challengeeName} is ${path}ed!`);
        this.$root.$bvToast.toast(`Invitations of ${this.challengerName} on ${this.topicName} ${nextStatus}ed!`, {
          variant: "info",
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          toaster: "b-toaster-top-left",
        });
      })
      .catch (() => {
        this.$root.$bvToast.toast("ERROR! Try again...", {
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true,
          noCloseButton: true,
          toaster: "b-toaster-top-center",
        });
      });
    },
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