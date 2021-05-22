<template>
  <b-container class="text-center mt-4">
    <h2>
      <b-icon icon="align-end" class="text-primary"></b-icon>
      Duellers
      <b-icon icon="align-start" class="text-primary"></b-icon>
    </h2>
    <div class="mt-5">
      <b-row>
		<b-col class="col-12 col-md-4">
			<b-card
				tag="article"
				class="mx-auto place search"
			>
				<h4 font-weight-bold>
					<b-icon icon="three-dots" animation="cylon" class="text-primary"></b-icon>
					Search by Name
					<b-icon icon="three-dots" animation="cylon" class="text-primary"></b-icon>
				</h4>
				<b-form-input class="mt-5" v-model="keyword" placeholder="Search for Participant"></b-form-input>
			</b-card>
        </b-col>
        <b-col>
          <b-card>
            <h4 style="text-decoration: underline;">Available Participants</h4>
            <b-card-body
				id="nav-scroller"
				ref="content"
				style="position:relative; height:400px; overflow-y:scroll;"
				class="listing"
            >
				<b-row
					align-h="center"
					class="m-2 text-danger"
					v-if="relevantParticipants.length === 0"
				>
					Sorry, no participant found!
				</b-row>
				<b-row
					class="m-2"
					v-else
					v-for="participant in relevantParticipants" :key="participant.userid"
				>
					<b-col>
						<b-button
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							:to="{
								// TODO: update riderction here [we'll modify DualConfirm later]
								// render to a waiting page
								name: 'DualConfirm',	
								params: { 
									topicId: topicId,
									challengerName: participant.name,
									throwingType: true
								},
							}"
						>	
							<b-row align-h="center">
								<b-col
									style="border-right: 2px solid violet;"
									cols="7"
								>
									<b-avatar variant="info" :src="participant.logo"></b-avatar>
									{{ participant.name }}
								</b-col>
								<b-col>
									<span style="color: purple;"> Level: {{ participant.level }} </span>
									<b-progress :max="max" class="mb-3">
										<b-progress-bar v-if="participant.level >= values[0]" striped :animated="animate" variant="danger" :value="values[0]"></b-progress-bar>
										<b-progress-bar v-if="participant.level >= values[1]" striped :animated="animate" variant="danger" :value="values[1]"></b-progress-bar>
										<b-progress-bar v-if="participant.level >= values[2]" striped :animated="animate" variant="warning" :value="values[2]"></b-progress-bar>
										<b-progress-bar v-if="participant.level >= values[3]" striped :animated="animate" variant="warning" :value="values[3]"></b-progress-bar>
										<b-progress-bar v-if="participant.level >= values[4]" striped :animated="animate" variant="success" :value="values[4]"></b-progress-bar>
										<b-progress-bar v-if="participant.level >= values[5]" striped :animated="animate" variant="success" :value="values[5]"></b-progress-bar>
									</b-progress>
								</b-col>	
							</b-row>
						</b-button>
					</b-col>
				</b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
		values: [1, 2, 3, 4, 5, 6],
        max: 7,
		topicId: "",
		keyword: "",
		participants: [
			{ userid: "1", name: "Shafin Khadem", level: 5, logo: "https://placekitten.com/300/300" },
			{ userid: "2", name: "Washief Hossain", level: 6, logo: "https://placekitten.com/300/300" },
			{ userid: "3", name: "Ahsanul Ameen", level: 4, logo: "https://placekitten.com/300/300" },
			{ userid: "4", name: "Tahmidur Rafid", level: 4, logo: "https://placekitten.com/300/300" },
			{ userid: "5", name: "Najrin Sultana", level: 5, logo: "https://placekitten.com/300/300" },
			{ userid: "6", name: "Ibrat Rabeeb", level: 5, logo: "https://placekitten.com/300/300" },
			{ userid: "7", name: "Harry Potter", level: 2, logo: "https://placekitten.com/300/300" },
			{ userid: "8", name: "You Know Who!", level: 6, logo: "https://placekitten.com/300/300" },
			{ userid: "9", name: "Ronald Ross", level: 5, logo: "https://placekitten.com/300/300" },
			{ userid: "10", name: "Benjamin Netaniahu", level: 0, logo: "https://placekitten.com/300/300" },
			{ userid: "11", name: "Erricto", level: 5, logo: "https://placekitten.com/300/300" },
			{ userid: "12", name: "Peter Parker", level: 3, logo: "https://placekitten.com/300/300" },
			{ userid: "13", name: "Willium Lin", level: 6, logo: "https://placekitten.com/300/300" },
			{ userid: "14", name: "Fundamentalist", level: 5, logo: "https://placekitten.com/300/300" },
			{ userid: "15", name: "Dragon Warrior", level: 4, logo: "https://placekitten.com/300/300" },
		]
    };
  },
  computed: {
    relevantParticipants() {
      if (this.keyword.length == 0) return this.participants;
      return this.participants.filter((participant) => {
        return this.isSubsequence(
          this.keyword.toLowerCase(),
          participant.name.toLowerCase(),
          this.keyword.length,
          participant.name.length
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

<style>
	.search {
		background-color: #fdf7f2;
		border-radius: 15px;
		margin: 10px;
		padding: 10px;
	}
	.listing {
		background-color: #fdf7f2;
		border-radius: 10px;
		margin: 5px;
		padding-top: 10px;
	}
</style>
