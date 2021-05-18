<template>
  <div>
    <div class="text-center mt-4">
      <h2>
        <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
        Solo Challenge
        <b-icon icon="grip-horizontal" class="text-primary"></b-icon>
      </h2>
      <b-container class="mt-5">
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
                  v-if="relevantTopics.length == 0"
                >
                  Sorry, no topic found!
                </b-row>
                <b-row
                  class="m-2"
                  v-else
                  v-for="topic in relevantTopics"
                  :key="topic"
                >
                  <b-col>
                    <b-button
                      pill
                      class="shadow-sm font-weight-bold bg-light text-dark"
                      to="challenges/soloChallenge/browseTopics"
                    >
                      <b-icon
                        icon="bar-chart-fill"
                        class="text-primary"
                      ></b-icon>
                      {{ topic }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
          <b-col class="ml-5 mr-5">
            <b-form-input v-model="keyword" placeholder="Search"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      topics: [
        "Python",
        "C programming",
        "C++ ",
        "Java",
        "JavaScript",
        "PHP",
        "Operating System",
        "Cloud computing",
        "Blockchain",
        "Machine learning",
        "Database management system",
        "Artificial intelligence",
        "Front end technique",
        "Networking fundamental",
        "Web designing",
        "Computer graphics",
        "Software development",
        "E-commerce",
        "Computer architecture",
        "Cyber laws and security",
        "Algorithms and data structures",
      ],
    };
  },
  computed: {
    relevantTopics() {
      if (this.keyword.length == 0) return this.topics;
      return this.topics.filter((topic) => {
        return this.isSubsequence(
          this.keyword.toLowerCase(),
          topic.toLowerCase(),
          this.keyword.length,
          topic.length
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
