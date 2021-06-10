<template>
  <div>
    user id: {{id}}
    Rank: {{rank}}
    Total score: {{total_score}}
    <div class="small">
      <line-chart :chart-data="datacollection" :options="chartoptions"></line-chart>
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
      rank: null,
      total_score: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.apiGet(`/public/best/${this.id}`).then((data) => {
        const bgn = { ...data[0] };
        bgn.score = 0;
        data.unshift(bgn);
        console.log(data);
        const plotdata = data.map(
          ((s) => (v) => ({ x: moment(v.time), y: (s += v.score) }))(0)
        );
        this.datacollection = {
          datasets: [
            {
              label: "Cumulative score",
              data: plotdata,
            },
          ],
        };
      });
      this.apiGet(`/public/rank?userid=${this.id}`).then((data) => {
        this.rank = data[0].rank;
        this.total_score = data[0].total_score;
      });
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