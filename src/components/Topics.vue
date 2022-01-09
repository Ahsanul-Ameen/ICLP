<template>
  <b-container class="text-center mt-4">
    <h2>
      <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
      {{ header }}
      <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
    </h2>
    <div class="mt-5">
      <b-row>
        <b-col class="ml-5 mr-5">
          <b-card>
            <b-form-input
              v-model="keyword"
              placeholder="Search topic"
            ></b-form-input>
          </b-card>
        </b-col>
        <b-col cols="12" md="8">
          <b-card>
            Select Challenge Topic
            <b-card-body
              id="nav-scroller"
              ref="content"
              style="position: relative; height: 300px; overflow-y: scroll"
            >
              <loading :show="topics.length == 0">
                <div
                  align-h="center"
                  class="m-2 text-danger"
                  v-if="topics.length > 0 && relevantTopics.length == 0"
                >
                  Sorry, no topic found!
                </div>
                <b-list-group v-else>
                  <div v-for="topic in relevantTopics" :key="topic.id">
                    <list-group-item-link :to="topiclink(topic)">
                      <div class="link">{{ topic.name }}</div>
                    </list-group-item-link>
                  </div>
                </b-list-group>
              </loading>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import apiUtil from "@/mixins/apiUtil";
import Loading from "@/components/Loading.vue";
import ListGroupItemLink from "@/components/ListGroupItemLink.vue";

export default {
  props: ["topiclink", "header"],
  data() {
    return {
      keyword: "",
      topics: [],
    };
  },
  components: {
    Loading,
    ListGroupItemLink,
  },
  mounted() {
    this.apiGet("/public/problem-topics").then((result) => {
      this.topics = result || [];
    });
  },
  mixins: [apiUtil],
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
  methods: {
    isSubsequence(str1, str2, m, n) {
      if (m == 0) return true;
      if (n == 0) return false;

      if (str1[m - 1] == str2[n - 1])
        return this.isSubsequence(str1, str2, m - 1, n - 1);
      return this.isSubsequence(str1, str2, m, n - 1);
    },
  },
};
</script>

<style></style>
