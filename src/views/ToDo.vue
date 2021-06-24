<template>
	<b-container>
		<h2 class="text-center mt-4">
			<b-icon icon="grip-horizontal" class="text-primary"></b-icon>
				Your Notifications
			<b-icon icon="grip-horizontal" class="text-primary"></b-icon>
		</h2>
		<div class="mt-5 message-box">
			<h4 class="text-center my-3 inv hover-zoom" @click.prevent="refresh">
				Messages 
				<b-icon 
					icon="arrow-repeat" 
					animation="throb" 
					font-scale="1" 
				>
				</b-icon>
			</h4>
			<Notifications :userId="userId" :userName="userName" :messages="messages" @choose-a-message="updateChoice"/>
		</div>
		<b-row
			align-h="center"
			class="mt-4 text-danger"
		>
			<b-button
				v-if="(this.choosedMessage && this.choosedMessage.status === 'full_completed')"
				pill
				variant="primary"	
				class="shadow-lg font-weight-bold"
				:disabled="choosedMessage === null"
				:to="DualResult"
			>
				See Results
			</b-button>
			<b-button
				v-else
				pill
				variant="primary"	
				class="shadow-lg font-weight-bold"
				:disabled="choosedMessage === null"
				:to="DualConfirm"
			>
				Continue to exam
			</b-button>

		</b-row>
	</b-container>
</template>

<script>
import thisuser from "@/mixins/thisuser";
import apiUtil from '@/mixins/apiUtil';
import Notifications from "@/components/Notifications";
export default {
	components: {
		Notifications
	},
	data() {
		return {
			userId: null,
			userName: null,
			messages: [	
				// {
				// 	challengee_id:3
				// 	challengee_name:"ahsanul ameen"
				// 	challenger_id:1
				// 	challenger_name:"voldemort"
				// 	exam_id:2
				// 	status:"pending"
				// 	topic_id:2
				// 	topic_name:"python",
				//	last_accessed: "timestamp"
				// },
			],
			choosedMessage: null
		};
	},
	methods: {
		refresh() {
			console.log("refreshing messages...");
			this.apiGet(`/dual/invitations?userid=${this.userId}`)
			.then((data) => {
				this.messages = data;
				//this.printJsonArray(this.messages);
			});
		},
		setUser(id, name) {
			this.userId = id;
			this.userName = name;
		},
		printJsonArray(jarray) {
			console.log("-----printing json array---------");
			for (var i = 0; i < jarray.length; i++) {
				console.log( jarray[i] );
			}
			console.log("---------------------------------");
		},
		// pass this to the event-handler of the component
		updateChoice(message) {
			this.choosedMessage = message;
		},
	},
	computed: {
		DualConfirm() {
			return {
				name: 'DualConfirm',
				params: { 
					topicId: this.choosedMessage ? this.choosedMessage.topic_id : null,
					topicName: this.choosedMessage ? this.choosedMessage.topic_name : null,
					challengerName: this.choosedMessage? this.choosedMessage.challenger_name: null,
					challengerId: this.choosedMessage? this.choosedMessage.challenger_id: null,
					challengeeId: this.choosedMessage? this.choosedMessage.challengee_id: null,
					challengeeName: this.choosedMessage? this.choosedMessage.challengee_name: null,
					throwingType: false,
					examId: this.choosedMessage? this.choosedMessage.exam_id: null,
					status: this.choosedMessage? this.choosedMessage.status: null
				} 
			}
		},
		DualResult() {
			return {
				name: 'DualResult',
				params: { 
					examId: this.choosedMessage? this.choosedMessage.exam_id: null
				}
			}
		},
	},
	mounted() {
		
		this.refresh();
	},
	created() {
		this.setUser(this.userid, this.username);
	},
	mixins: [thisuser, apiUtil],


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
</style>

