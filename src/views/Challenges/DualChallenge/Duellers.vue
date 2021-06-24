<template>
  <b-container class="text-center mt-4">
    <h2>
      <b-icon icon="align-end" class="text-primary"></b-icon>
      Find a dueller on {{topicName}}
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
										topicName: topicName,
										challengerName: challengerName,
										challengerId: challengerId,
										challengeeName: participant.name,
										challengeeId: participant.userid,
										throwingType: true,
										examId: null,
										status: null
									},
								}"
						>	
							<b-row align-h="center">
								<b-col
									style="border-right: 2px solid violet;"
									cols="7"
								>
									<b-avatar variant="info" :src="logo"></b-avatar>
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
import thisuser from '@/mixins/thisuser';
import apiUtil from "@/mixins/apiUtil";
export default {
  data() {
    return {
		values: [1, 2, 3, 4, 5, 6],
        max: 7,
		animate: true,
		topicId: 2,	//default
		topicName: "python", //default
		challengerId: null,
		challengerName: null,
		keyword: "",
		logo: "https://placekitten.com/300/300",//default
		ranks: null,
		participants: []
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
	maxScore(data) {
		var len = data.length, max = -Infinity;
		while (len--) {
			if (Number(data[len]['score']) > max) {
				max = Number(data[len]['score']);
			}
		}
		return max;
	},
	setParticipants(data) {
		const maxScore = this.maxScore(data);
		data.forEach((r) => {
			var d = {
				userid : r.userid,
				name : r.name,
				level : parseInt( (parseFloat(r.score) * 7.0 + maxScore - 1) / maxScore )
			};
			if(parseInt(d.userid)  != parseInt(this.challengerId)) {
				this.participants.push(d);
			}
		});
	},
  },
  created() {
	this.topicId = this.$route.params.topicId ? this.$route.params.topicId : this.topicId;
	this.topicName = this.$route.params.topicName ? this.$route.params.topicName : this.topicName;
	this.challengerId = this.userid;
	this.challengerName = this.username;
	this.apiGet(
        `/public/activeusers/`
      ).then((data) => {
		this.setParticipants(data);
      });
  },
  mixins: [apiUtil, thisuser],
  mounted() {
    
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
