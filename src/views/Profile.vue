<template>
  <div>
    user id: {{id}}
    <div class="small">
      <line-chart :chart-data="datacollection" :options="chartoptions"></line-chart>
      <button @click="fillData()">Randomize</button>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.js";
import apiUtil from "@/mixins/apiUtil";
import moment from "moment";

export default {
  name: "Profile",
  props: ["id"],
  mixins: [apiUtil],
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: {},
      chartoptions: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.apiGet(`/public/best/${this.id}`).then((data) => {
        let plotdata = data.map(
          ((s) => (v) => ({ x: moment(v.time), y: (s += v.score) }))(0)
        );
        console.log(plotdata);
        this.datacollection = {
          datasets: [
            {
              label: "Cumulative score",
              data: plotdata,
            },
          ],
        };
      });
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>