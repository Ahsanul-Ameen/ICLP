<template>
	<b-container>
		<h2 class="text-center mt-4">
			<b-icon icon="grip-horizontal" class="text-primary"></b-icon>
				Accept a Challenge
			<b-icon icon="grip-horizontal" class="text-primary"></b-icon>
		</h2>
		<div class="mt-5 message-box">
			<h4 class="text-center my-3 inv">
				Invitations
			</h4>
			<div class="mx-1 my-2 px-1 pt-3 message-body">
				<b-card 
					class="mb-2"
					style="border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;"
				>
					<b-card-body
						id="nav-scroller"
						ref="content"
						style="max-height:400px; overflow-y: scroll;"
						class="theme"
					>
						<b-row
							align-h="center"
							class="m-2 text-danger"
							v-if="challenges.length === 0"
						>
							<h4>No one have challenged you yet</h4>
						</b-row>

						<b-row
							align-h="center"
							class="m-2 text-danger"
							v-else
							v-for="(challenge, index) in challenges" :key="index"
						>
							<b-col>
								<b-button
									:disabled='challenge.isAccepted'
									block
									variant="light"
									class="shadow-sm font-weight-bold text-left shadow hover-zoom"
									@click.prevent="choosedChallenge = challenge"
									v-bind:class="{ 'highlight' : choosedChallenge && challenge.challengeId === choosedChallenge.challengeId}"
								> 
									<span class="dot"> {{ index + 1 }} </span>
									<span style="color: blue"> {{ challenge.challengerName }} </span>
									<span style="color: #f59300">has challenged you in </span>
									<span style="color: brown"> {{ challenge.topicName }} </span>
									<b-icon v-show='challenge.isAccepted' icon="check-all"></b-icon>
								</b-button>
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</div>
		</div>
		<b-row
			align-h="center"
			class="mt-4 text-danger"
		>
			<b-button
				pill
				variant="primary"	
				class="shadow-lg font-weight-bold"
				:disabled="choosedChallenge === null"
				:to="DualConfirm"
			>
				Accept
			</b-button>
		</b-row>
	</b-container>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			choosedChallenge: null,
			userId: "",
			userName: "",
			challenges: [	
				{
					topicId: "1",
					topicName: "Unity",
					challengeId: "1",
					challengerId: "1",
					challengerName: "BarcaLover",
					isAccepted: true	// TODO: add way to update status in case challenge is accepted
				}, 
				{
					topicId: "2",
					topicName: "Machine Learning",
					challengeId: "2",
					challengerId: "2",
					challengerName: "Andrew NG",
					isAccepted: true
				}, 
				{
					topicId: "3",
					topicName: "Ruby on Rails",
					challengeId: "3",
					challengerId: "3",
					challengerName: "Lorence Macorthy",
					isAccepted: false
				}, 
				{
					topicId: "4",
					topicName: "Functional Programming",
					challengeId: "4",
					challengerId: "4",
					challengerName: "Noam Nishan",
					isAccepted: false
				}, 
				{
					topicId: "5",
					topicName: "Java",
					challengeId: "5",
					challengerId: "5",
					challengerName: "Peter Metrichev",
					isAccepted: false
				}, 
				{
					topicId: "6",
					topicName: "C++",
					challengeId: "6",
					challengerId: "6",
					challengerName: "Erricto",
					isAccepted: false
				}
			],
		};
	},
	methods: {
	},
	computed: {
		DualConfirm() {
			return {
				name: 'DualConfirm',
				params: { 
					topicId: this.choosedChallenge ? this.choosedChallenge.topicId : -1,
					challengerName: this.choosedChallenge? this.choosedChallenge.challengerName: '',
					throwingType: false
				} 
			}
		}
	},
	created() {
		this.userId = this.$route.params.userId;
		this.userName = this.$route.params.userName;
	},
};
</script>

<style lang="scss" scoped>
	.message-box {
		border-radius: 25px;
		border: 2px solid #0e0b09;
		background-color: rgb(67, 40, 70);
	}
	.inv {
		color: rgb(218, 255, 148);
	}
	.message-body {
		border-radius: 5px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
		border: 2px solid #ecaffb;
		background-color: rgb(249, 244, 250);
	}
	.theme {
		background-color: rgb(252, 208, 255);
		border-radius: 5px;
	}
	.dot {
		height: 25px;
		width: 25px;
		background-color: rgb(209, 253, 255);
		border-radius: 50%;
		border: 2px solid #8cb992;
		display: inline-block;
		text-align: center;
	}
	.highlight {
		border: 2px inset green
	}
</style>