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
							:to="{
								// TODO: update riderction here
								name: 'ThrowDualConfirm',	
								params: { topicId: topic.id },
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
export default {
  data() {
    return {
      keyword: "",
      topics: [
        { id: "1", name: "Python", description: "" },
        { id: "2", name: "C programming", description: "" },
        { id: "3", name: "C++ ", description: "" },
        { id: "4", name: "Java", description: "" },
        { id: "5", name: "JavaScript", description: "" },
        { id: "6", name: "PHP", description: "" },
        { id: "7", name: "Operating System", description: "" },
        { id: "8", name: "Cloud computing", description: "" },
        { id: "9", name: "Blockchain", description: "" },
        { id: "10", name: "Machine learning", description: "" },
        { id: "11", name: "Database management system", description: "" },
        { id: "12", name: "Artificial intelligence", description: "" },
        { id: "13", name: "Front end technique", description: "" },
        { id: "14", name: "Networking fundamental", description: "" },
        { id: "15", name: "Web designing", description: "" },
        { id: "16", name: "Computer graphics", description: "" },
        { id: "17", name: "Software development", description: "" },
        { id: "18", name: "E-commerce", description: "" },
        { id: "19", name: "Computer architecture", description: "" },
        { id: "20", name: "Cyber laws and security", description: "" },
        { id: "21", name: "Algorithms and data structures", description: "" },
      ],
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
