<template>
  <div class="clock pt-1">
    <m-row>
      <m-col>
        Timer:
      </m-col>
      <m-col>
        <seven-segment
          v-for="(m, i) in minutes"
          :key="m + i"
          :value="m"
          :rounded="false"
          :segment-width="10"
          :segment-height="3"
          class="mr-1"
          on-color="#000"
          off-color="rgba(100, 100, 100, .2)"
        />
      </m-col>
      <m-col class="mr-1">min</m-col>
      <m-col>
        <seven-segment
          v-for="(m, i) in seconds"
          :key="m + i"
          :value="m"
          :rounded="false"
          :segment-width="10"
          :segment-height="3"
          class="mr-1"
          on-color="#000"
          off-color="rgba(100, 100, 100, .2)"
        />
      </m-col>
      <m-col class="mr-1">sec</m-col>
    </m-row>
  </div>
</template>

<script>
import SevenSegment from "vue-seven-segment-display";
export default {
  components: { SevenSegment },
  data() {
    return {
      clock: "",
    };
  },

  props: {
    secondsLeft: {
      type: Number,
      required: true,
      validator: function(value) {
        return value > 0;
      },
    },
  },

  created() {
    this.clock = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft <= 0) {
        this.$emit("timesup");
        clearInterval(this.clock);
      }
    }, 1000);
  },
  computed: {
    minutes() {
      let minute = Math.floor(this.secondsLeft / 60);
      minute = minute.toString().split("");
      if (minute.length === 1) minute.unshift("0");
      return minute;
    },
    seconds() {
      let second = this.secondsLeft % 60;
      second = second.toString().split("");
      if (second.length === 1) second.unshift("0");
      return second;
    },
  },
};
</script>

<style lang="scss" scoped>
.clock {
  border-style: solid;
  border-radius: 5px;
}
</style>
