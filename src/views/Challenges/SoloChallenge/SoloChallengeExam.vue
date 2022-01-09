<template>
  <div>
    <b-row class="p-3 shadow-sm">
      <b-col align-self="center" class="ml-5">
        <h5>
          <b-icon
            icon="grip-horizontal"
            class="text-primary d-none d-md-inline"
          />
          MCQ Challenge
          <b-icon
            icon="grip-horizontal"
            class="text-primary d-none d-md-inline"
          />
        </h5>
      </b-col>
      <b-col v-if="time !== null && !finished" class="pr-5">
        <b-row align-h="end">
          <Timer :time="time" @timesup="submit"></Timer>
        </b-row>
      </b-col>
      <b-col v-if="finished" class="pr-5 font-weight-bold">
        <b-row align-h="end"> Marks : {{ achievedScore }}</b-row>
      </b-col>
    </b-row>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <p class="font-weight-bold mr-2">
          <b-icon icon="file-earmark-text" class="text-primary mr-2" />
          {{ title }}
        </p>
      </b-row>
      <b-row align-h="center">
        <p class="font-weight-bold mr-2">
          <b-icon icon="box" class="text-primary mr-2" />Total Score:
        </p>
        <p>{{ score }}</p>
      </b-row>
      <b-row align-h="center">
        <p class="font-weight-bold">
          <b-icon icon="alarm" class="text-primary mr-2" />Time:
        </p>
        <p v-for="time_unit in getTime(time)" :key="time_unit.key" class="ml-2">
          {{ time_unit.val }} {{ time_unit.key }}
        </p>
      </b-row>
      <b-row
        v-for="(question, index) in questions"
        :key="question.statement + index"
        class="mt-2"
      >
        <b-col cols="8">
          <b-form-group
            :label="'Q' + (index + 1) + ': ' + question.statement"
            :v-slot="index"
            class="font-weight-bold"
          >
            <div v-if="question.type === 1">
              <b-form-radio
                v-for="option in question.options"
                :key="option"
                v-model="question.answer"
                :aria-describedby="index"
                :value="option"
                :name="index.toString()"
                :state="question.state"
                class="font-weight-normal"
                >{{ option }}
              </b-form-radio>
            </div>
            <b-form-checkbox-group
              v-else
              v-model="question.answer"
              :options="question.options"
              :aria-describedby="index"
              :state="question.state"
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-row align-h="end" style="opacity: 0.5">
            {{ question.points }} Points
          </b-row>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-button
          v-if="!finished"
          pill
          variant="primary"
          class="shadow-lg font-weight-bold"
          @click="submit"
          >Submit</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import timeUtility from "@/mixins/timeUtility";
import apiUtil from "@/mixins/apiUtil";
export default {
  components: { Timer },
  data() {
    return {
      finished: false,
      title: null,
      difficulty: null,
      score: null,
      time: null,
      questions: null,
      resultId: null,
      achievedScore: 0,
    };
  },
  mixins: [timeUtility, apiUtil],
  methods: {
    submit() {
      //this.finished = true;
      this.apiPostPromise(`/mcq/submit/${this.resultId}`, {
        answers: this.questions.map((question) => question.answer),
      })
        .then((data) => {
          this.$root.$bvToast.toast(`Your answers are submitted successfully`, {
            title: "MCQ challenge has ended",
            variant: "success",
            autoHideDelay: 5000,
            appendToast: true,
          });
          data = data.data;
          for (
            let i = 0;
            i < Math.min(this.questions.length, data.questions.length);
            i++
          ) {
            if (typeof this.questions[i].answer !== "undefined") {
              if (this.questions[i].type === 1) {
                if (data.questions[i].answer == this.questions[i].answer)
                  this.questions[i].state = true;
                else this.questions[i].state = false;
              } else {
                this.questions[i].answer.sort();
                data.questions[i].answer.sort();
                if (
                  data.questions[i].answer.length ===
                  this.questions[i].answer.length
                ) {
                  this.questions[i].state = true;
                  for (let j = 0; j < this.questions[i].answer.length; j++)
                    if (
                      data.questions[i].answer[j] != this.questions[i].answer[j]
                    )
                      this.questions[i].state = false;
                } else this.questions[i].state = false;
              }
            }
            this.questions[i].answer = data.questions[i].answer;
          }
          this.achievedScore = data.score;
          this.finished = true;
        })
        .catch(() => {
          this.$router.push({ name: "BrowseTopics" });
          this.$root.$bvToast.toast(
            "An error has occured during submitting the answer.",
            {
              variant: "danger",
              autoHideDelay: 2000,
              appendToast: true,
              noCloseButton: true,
              solid: true,
            }
          );
        });
    },
  },
  created() {
    this.challengeId = this.$route.params.challengeId;
    this.apiPost(`/mcq/start/${this.challengeId}`).then((data) => {
      for (const property in data) this[property] = data[property];
      this.title = this.title.toUpperCase();
    });
  },
};
</script>

<style lang="scss" scoped></style>
