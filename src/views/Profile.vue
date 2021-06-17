<template>
  <b-container>
    user: {{ user }}
    <div>
      <h3>Statistics</h3>
      <b-form-group label="Topic" label-for="topic">
        <b-select id="topic" v-model="topicid" :options="topics" required />
      </b-form-group>
      Rank: {{ rank }} Total score: {{ total_score }}
      <line-chart :chart-data="linedata" :options="chartoptions" />
      <bar-chart :chart-data="bardata" :options="chartoptions" />
    </div>
  </b-container>
</template>

<script>
import LineChart from "@/components/LineChart.js";
import BarChart from "@/components/BarChart.js";
import apiUtil from "@/mixins/apiUtil";
import moment from "moment";

export default {
  name: "Profile",
  props: ["id"],
  mixins: [apiUtil],
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      user: null,
      topics: [],
      topicid: 0,
      linedata: {},
      bardata: {},
      chartoptions: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
              },

              // unique defaults for bar chart which doesn't get merged once you specify xAxes :)
              offset: true,
              gridLines: { offsetGridLines: true },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision: 0,
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
    this.apiGet("/public/problem-topics").then((result) => {
      this.topics = result.map((a) => ({ value: a.id, text: a.name })) || [];
      this.topics.push({ value: 0, text: "all" });
    });
    this.apiGet(`/public/user/${this.id}`).then(([{ user }]) => {
      this.user = user;
    });
    this.fillData();
  },
  methods: {
    fillData() {
      this.apiGet(`/public/best/${this.id}?topicid=${this.topicid}`).then(
        (data) => {
          // const bgn = { ...data[0] };
          // bgn.score = 0;
          // data.unshift(bgn);
          const lineplotdata = data.map(
            ((s) => (v) => ({ x: moment(v.time), y: (s += v.score) }))(0)
          );
          const barplotdata = data.map((v) =>
            moment(v.time)
              .startOf("day")
              .format("YYYY-MM-DD")
          );
          const counts = {};
          for (var i = 0; i < barplotdata.length; i++) {
            var num = barplotdata[i];
            counts[num] = (counts[num] || 0) + 1;
          }
          this.linedata = {
            datasets: [
              {
                label: "Cumulative score",
                data: lineplotdata,
              },
            ],
          };
          this.bardata = {
            labels: Object.keys(counts),
            datasets: [
              {
                label: "Best attempts",
                data: Object.values(counts),
              },
            ],
          };
        }
      );
      this.apiGet(
        `/public/rank?userid=${this.id}&topicid=${this.topicid}`
      ).then(([data]) => {
        this.rank = data.rank;
        this.total_score = data.total_score;
      });
    },
  },
  watch: {
    topicid: {
      handler() {
        this.fillData();
      },
    },
  },
};
</script>

<style></style>
