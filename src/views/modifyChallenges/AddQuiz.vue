<template>
  <b-container>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-0" label="Title:" label-for="title">
        <b-form-input
          id="title"
          v-model="title"
          type="text"
          :state="validateTitle()"
          placeholder="Enter title of this quiz"
          required
        >
        </b-form-input>
        <b-form-invalid-feedback>
          Title length must be between 4 and 25
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-1" label="Time:" label-for="title">
        <b-form-input
          id="title"
          v-model="time"
          type="number"
          :state="validateTime()"
          placeholder="Enter time in seconds"
          required
        >
        </b-form-input>
        <b-form-invalid-feedback>
          Time must be in 30 seconds to 1 hour
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Difficulty:"
        label-for="difficulty"
      >
        <b-form-select
          id="difficulty"
          v-model="difficulty"
          :options="difficultyLevel"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Topic:" label-for="topic">
        <b-form-select
          id="topic"
          v-model="topic"
          :options="topicsAvailable"
          :state="topic !== null"
        ></b-form-select>
        <b-form-invalid-feedback>
          Select a topic
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form @submit.prevent="onSubmit">
        <b-row
          v-for="(question, index) in questions"
          :key="question.id"
          class="mt-2"
        >
          <b-col>
            <b-card>
              <b-row class="mr-3 mb-3">
                <b-col>
                  <b-row align-h="end">
                    <b-icon @click="deleteQuestion(index)" icon="x-circle" />
                  </b-row> </b-col
              ></b-row>

              <b-form-group>
                <b-form-input
                  v-model="question.statement"
                  placeholder="Write statement of the question"
                ></b-form-input>
                <label :for="question.type + index" class="mt-2">
                  Select type:
                </label>
                <b-form-select
                  :id="question.type + String(index)"
                  v-model="question.type"
                  :options="[1, 2]"
                  @change="changeRoutine(index)"
                ></b-form-select>
                <label :for="question.points + String(index)" class="mt-2">
                  Point for this question:
                </label>
                <b-form-input
                  type="number"
                  :id="question.points + String(index)"
                  v-model="question.points"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :label="
                  'Preview of Q' + (index + 1) + ': ' + question.statement
                "
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
                    class="font-weight-normal"
                    >{{ option }}
                  </b-form-radio>
                </div>
                <b-form-checkbox-group
                  v-else
                  v-model="question.answer"
                  :options="question.options"
                  :aria-describedby="index"
                  class="font-weight-normal"
                ></b-form-checkbox-group>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="question.nextOption"
                  placeholder="Write a new option"
                ></b-form-input>
                <b-button class="mt-2" size="sm" @click="addOption(index)"
                  >Add option</b-button
                >
              </b-form-group>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
      <b-form-group class="mt-4" v-if="questions.length < 5">
        <b-button @click="addQuestion">
          Add a new question
        </b-button>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mt-3" :disabled="loading"
        ><span v-if="!loading">Upload this quiz</span>
        <b-spinner small v-else label="Spinning"></b-spinner>
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import validator from "validator";
import apiUtil from "@/mixins/apiUtil";
export default {
  data() {
    return {
      difficultyLevel: ["easy", "medium", "difficult"],
      topicsAvailable: [],
      topic: null,
      loading: false,
      title: "",
      difficulty: "easy",
      time: 30,
      questions: [],
    };
  },
  mixins: [apiUtil],
  methods: {
    validateTitle() {
      if (this.title.length == 0) return undefined;
      return validator.isByteLength(this.title, { min: 4, max: 25 });
    },
    validateTime() {
      return this.time >= 30 && this.time <= 3600;
    },
    addQuestion() {
      this.questions.push({
        type: 1,
        points: 1,
        statement: "",
        options: [],
        nextOption: "",
        id: this.makeId(20),
        answer: undefined,
      });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    addOption(index) {
      this.questions[index].options.push(this.questions[index].nextOption);
      this.questions[index].nextOption = "";
    },
    makeId(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    changeRoutine(index) {
      if (this.questions[index].type === 1)
        this.questions[index].answer = undefined;
      else this.questions[index].answer = [];
    },
    validateQuestion(index) {
      if (this.questions.length <= index) return false;
      if (this.questions[index].points <= 0) return false;
      if (typeof this.questions[index].answer === "undefined") return false;
      if (
        this.questions[index].type == 2 &&
        this.questions[index].answer.length <= 0
      )
        return false;
      if (this.questions[index].options.length < 2) return false;
      if (this.questions[index].statement.length < 2) return false;
      return true;
    },

    onSubmit() {
      let questions = [];
      for (let i = 0; i < this.questions.length; i++)
        if (this.validateQuestion(i)) questions.push(this.questions[i]);
      //this.questions = questions;
      if (questions.length < 3) {
        this.$root.$bvToast.toast("Questionset is not complete. Try again.", {
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true,
          noCloseButton: true,
          solid: true,
        });
      } else {
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
          delete questions[i].nextOption;
          delete questions[i].id;
          score += parseInt(questions[i].points);
        }
        let body = {};
        body.content = JSON.stringify({ questions: questions });
        body.time = this.time;
        body.topic = this.topic;
        body.difficulty = this.difficulty;
        body.title = this.title;
        body.score = score;
        this.apiPostPromise(`/admin/add-quiz`, body)
          .then(() => {
            this.$root.$bvToast.toast("Question set submission successful.", {
              variant: "success",
              autoHideDelay: 2000,
              appendToast: true,
              noCloseButton: true,
              solid: true,
            });
            this.$router.push({ name: "Admin" });
          })
          .catch(() => {
            this.$root.$bvToast.toast(
              "Question set submission unsuccessful. Try again.",
              {
                variant: "danger",
                autoHideDelay: 2000,
                appendToast: true,
                noCloseButton: true,
                solid: true,
              }
            );
          });
      }
    },
  },
  mounted() {
    this.apiGet("/public/problem-topics").then((result) => {
      result.forEach((elem) => {
        this.topicsAvailable.push({ value: elem.id, text: elem.name });
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
