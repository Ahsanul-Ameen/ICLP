<template>
  <b-row>
    <b-table-simple borderless responsive>
      <b-tbody>
        <b-tr>
          <b-td v-for="time_unit in getFormattedTime" :key="time_unit.key">
            <seven-segment
              v-for="(m, i) in time_unit.val"
              :key="m + i"
              :value="m"
              :rounded="false"
              :segment-width="10"
              :segment-height="3"
              class="mr-1"
              on-color="#000"
              off-color="rgba(100, 100, 100, .2)"
            />
            {{ time_unit.key }}
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
    getFormattedTime() {
      let d = this.getTime(this.secondsLeft);
      d = d.map((item) => {
        item.val = String(item.val);
        return item;
      });
      return d;
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
