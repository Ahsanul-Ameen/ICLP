<template>
  <b-row>
    <b-table-simple borderless responsive>
      <b-tbody>
        <b-tr>
          <b-td v-if="parseInt(getHours(secondsLeft)) != 0">
            <seven-segment
              v-for="(m, i) in hours"
              :key="m + i"
              :value="m"
              :rounded="false"
              :segment-width="10"
              :segment-height="3"
              class="mr-1"
              on-color="#000"
              off-color="rgba(100, 100, 100, .2)"
            />
            hr
          </b-td>
          <b-td>
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
            min
          </b-td>
          <b-td>
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
            sec
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-row>
</template>

<script>
import SevenSegment from "vue-seven-segment-display";
import timeUtility from "../mixins/timeUtility";
export default {
  components: { SevenSegment },
  data() {
    return {
      clock: "",
      secondsLeft: "",
    };
  },

  props: {
    time: {
      type: Number,
      required: true,
      validator: function(value) {
        return value > 0;
      },
    },
  },
  mixins: [timeUtility],
  created() {
    this.secondsLeft = this.time;
    this.clock = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft <= 0) {
        this.$emit("timesup");
        clearInterval(this.clock);
      }
    }, 1000);
  },
  computed: {
    hours() {
      return this.getHours(this.secondsLeft).split("");
    },
    minutes() {
      return this.getMinutes(this.secondsLeft).split("");
    },
    seconds() {
      return this.getSeconds(this.secondsLeft).split("");
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
