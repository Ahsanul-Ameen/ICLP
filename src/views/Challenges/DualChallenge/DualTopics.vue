<template>
  <b-container class="text-center mt-4">
    <h2>
      <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
      Dual Challenge
      <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
    </h2>
    <div class="mt-5">
      <b-row>
        <b-col>
          <b-card>
            Select Challenge Topic
            <b-card-body
              id="nav-scroller"
              ref="content"
              style="position:relative; height:300px; overflow-y:scroll;"
            >
              <b-row
                align-h="center"
                class="m-2 text-danger"
                v-if="relevantTopics.length === 0"
              >
                Sorry, no topic found!
              </b-row>
              <b-row
                class="m-2"
                v-else
                v-for="topic in relevantTopics" :key="topic.id"
              >
                <b-col>
                  <b-button
                    pill
                    class="shadow-sm font-weight-bold bg-light text-dark"
                    v-b-popover.hover.bottom="topic.description"
                    :to="{
                      name: 'Duellers',	
                      params: { 
                        topicId: topic.id,
                        topicName: topic.name,
                        challengerId: userId,
                        challengerName: userName,
                      }
                    }"
                  >
                  <b-icon icon="bar-chart-fill" class="text-primary"></b-icon> {{ topic.name }}</b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col class="ml-5 mr-5">
          <b-form-input v-model="keyword" placeholder="Search"></b-form-input>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import apiUtil from "@/mixins/apiUtil";
import thisuser from '@/mixins/thisuser';
export default {
  data() {
    return {
      keyword: "",
      topics: [],
      userId: null,
      userName: null,
    };
  },
  computed: {
    relevantTopics() {
      if (this.keyword.length == 0) return this.topics;
      return this.topics.filter((topic) => {
        return this.isSubsequence(
          this.keyword.toLowerCase(),
          topic.name.toLowerCase(),
          this.keyword.length,
          topic.name.length
        );
      });
    },
  },
  mounted() {
    this.apiGet("/public/problem-topics").then((result) => {
      this.topics = result || [];
    });
    this.setUser(this.userid, this.username);
  },
  mixins: [apiUtil, thisuser],
  methods: {
    isSubsequence(str1, str2, m, n) {
      if (m == 0) return true;
      if (n == 0) return false;

      if (str1[m - 1] == str2[n - 1])
        return this.isSubsequence(str1, str2, m - 1, n - 1);
      return this.isSubsequence(str1, str2, m, n - 1);
    },
    setUser(id, name) {
			this.userId = id;
			this.userName = name;
		}
  },
  created() {
    this.userId = this.$route.params.userId;
    this.userName = this.$route.params.userName;
  },
};
</script>

<style></style>
