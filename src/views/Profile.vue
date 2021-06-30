<template>
  <b-container>
    <b-card v-if="user" class="mb-3">
      <b-row>
        <b-col cols="fluid" class="p-3">
          <b-avatar
            src="https://placekitten.com/300/300"
            size="10rem"
          ></b-avatar>
        </b-col>
        <b-col align-self="center">
          <h3>{{ user.name }}</h3>
          <h5>{{ user.email }}</h5>
          <h5 v-if="user.affiliation" class="text-primary">
            {{ user.affiliation }}
          </h5>
        </b-col>
        <b-col class="text-primary" align-self="center">
          <b-table-simple borderless>
            <b-thead>
              <b-tr class="display-4">
                <b-td class="font-weight-bold">{{ combinedRank }}</b-td>
                <b-td class="font-weight-bold">{{ combinedScore }}</b-td>
              </b-tr>
            </b-thead>
            <b-tbody class="text-primary text-weight-bold">
              <b-tr>
                <b-td class="font-weight-bold">RANK</b-td>
                <b-td class="font-weight-bold">TOTAL SCORE</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-card>

    <h3>Statistics</h3>
    <b-card class="text-primary">
      <b-row>
        <b-col cols="6">
          <b-form-group label="Topic" label-for="topic">
            <b-select id="topic" v-model="topicid" :options="topics" required />
          </b-form-group>
        </b-col>
        <b-col></b-col>
        <b-col align-self="center"> Topic-rank: {{ rank }} out of {{ solidusercount}} </b-col>
        <b-col align-self="center"> Topic-score: {{ total_score }} </b-col>
      </b-row>
    </b-card>

    <b-row>
      <b-col>
        <line-chart :chart-data="linedata" :options="chartoptions" />
      </b-col>
      <b-col>
        <bar-chart :chart-data="bardata" :options="chartoptions" />
      </b-col>
    </b-row>
    <b-row>
      <h3 class="mt-5">Activity</h3>
      <calendar-heatmap
        :values="activity"
        :endDate="new Date()"
        tooltip-unit="submissions"
        :range-color="[
          '#eeeeee',
          '#ffded8',
          '#fecdc5',
          '#feac9e',
          '#fe8b77',
          '#fd593c',
        ]"
      />
    </b-row>
    <b-row>
      <h3 class="mt-5">Activities</h3>
      <b-table striped hover :items="activities">
        <template #cell(id)="data">
          <router-link :to="{name: 'Submission', params: {id: data.value}}">{{data.value}}</router-link>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
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
    CalendarHeatmap,
  },
  data() {
    return {
      user: null,
      topics: [],
      topicid: 0,
      linedata: {},
      bardata: {},
      activity: [],
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
      combinedRank: null,
      combinedScore: null,
      rank: null,
      solidusercount: null,
      total_score: null,
      activities: []
    };
  },
  mounted() {
    this.apiGet(`/public/rank?userid=${this.id}`).then(([data]) => {
      this.combinedRank = data.rank;
      this.combinedScore = data.total_score;
    });
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
          const lineplotdata = data.map(
            ((s) => (v) => ({ x: moment(v.time), y: (s += v.score) }))(0)
          );
          const bgn = {
            x:
              data.length === 0
                ? moment().startOf("day")
                : moment(lineplotdata[0].x).subtract(1, "days"),
            y: 0,
          };
          lineplotdata.unshift(bgn);
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
                lineTension: 0,
                fill: false,
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
      this.apiGet(`/public/solidusercount/${this.topicid}`).then(([{count}]) => {
        this.solidusercount = count;
      });
      this.apiGet(`/public/activity/${this.id}?topicid=${this.topicid}`).then((data) => {
        this.activity = data;
      });
      this.apiGet(`/public/activities/${this.id}?topicid=${this.topicid}`).then((data) => {
        this.activities = data;
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

<style scoped>
.table td {
  text-align: center;
}
</style>
