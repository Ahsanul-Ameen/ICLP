<template>
  <div>
    <b-row class="p-3 shadow-sm">
      <b-col align-self="center" class="ml-5">
        <h5>
          <b-icon icon="grip-horizontal" class="text-primary" />
          Solo Challenge
          <b-icon icon="grip-horizontal" class="text-primary" />
        </h5>
      </b-col>
      <b-col class="pr-5">
        <b-row align-h="end">
          <Timer :secondsLeft="time" @timesup="submit"></Timer>
        </b-row>
      </b-col>
    </b-row>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <p class="font-weight-bold mr-2">
          <b-icon icon="file-earmark-text" class="text-primary mr-2" />Selected
          Topic:
        </p>
        <p>{{ topicName }}</p>
      </b-row>
      <b-row align-h="center">
        <p class="font-weight-bold mr-2">
          <b-icon icon="box" class="text-primary mr-2" />Total Marks:
        </p>
        <p>{{ marks }}</p>
      </b-row>
      <b-row align-h="center">
        <p class="font-weight-bold mr-2">
          <b-icon icon="alarm" class="text-primary mr-2" />Time:
        </p>
        <p>{{ time }}</p>
      </b-row>
      <b-row
        v-for="(question, index) in questions"
        :key="question.statement + index"
        class="mt-2"
      >
        <b-col cols="8">
          <b-form-group
            :label="'Q' + (index + 1) + ': ' + question.statement"
            v-slot="{ index }"
            class="font-weight-bold"
          >
            <b-form-radio
              v-for="(option, answerNo) in question.options"
              :key="option"
              :v-model="question.answer"
              :aria-describedby="index"
              :value="answerNo"
              class="font-weight-normal"
              >{{ option }}</b-form-radio
            >
          </b-form-group>
        </b-col>
        <b-col>
          <b-row align-h="end" style="opacity: .5">
            {{ question.points }} Points
          </b-row>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-button
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
import Timer from "../../../components/Timer.vue";
export default {
  components: { Timer },
  data() {
    return {
      topicId: "",
      topicName: "Machine Learning",
      marks: "20",
      hardness: "80",
      time: 10,
      challengeId: "",
      questions: [
        {
          type: 1,
          points: 5,
          statement:
            "Which of the following is an example of a deterministic algorithm?",
          options: ["PCA", "K-Means", "None of the above"],
          answer: undefined,
        },
        {
          type: 2,
          points: 9,
          statement:
            "Which of the following statement(s) is / are true for Gradient Decent (GD) and Stochastic Gradient Decent (SGD)?",
          options: [
            "In GD and SGD, you update a set of parameters in an iterative manner to minimize the error function.",
            "In SGD, you have to run through all the samples in your training set for a single update of a parameter in each iteration.",
            "In GD, you either use the entire data or a subset of training data to update a parameter in each iteration.",
          ],
          answer: undefined,
        },
        {
          type: 2,
          points: 6,
          statement:
            "Which of the following hyper parameter(s), when increased may cause random forest to over fit the data?",
          options: ["Number of Trees", "Depth of Tree", "Learning Rate"],
          answer: undefined,
        },
      ],
    };
  },
  methods: {
    submit() {
      this.$router.push({ name: "BrowseTopics" });
      this.$root.$bvToast.toast(`Your answers are submitted successfully`, {
        title: "Solo Challenge Ended",
        variant: "success",
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
  },
  beforeCreate() {
    this.challengeId = this.$route.params.challengeId;
  },
};
</script>

<style lang="scss" scoped></style>
