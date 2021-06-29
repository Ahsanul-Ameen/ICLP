<template>
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
					v-if="messages.length === 0"
				>
					<h4>No recent notificatoions...</h4>
				</b-row>

				<b-row
					align-h="center"
					class="m-2 text-danger"
					v-else
					v-for="(message, index) in messages" :key="index"
				>
					<b-col>
						<!-- pending in challengee -->
						<b-button
							v-if='userId === message.challengee_id && message.status === "pending"'
							:disabled='false'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challenger_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challenger_name }} </span>
							</b-badge>
							<span style="color: #f59300"> has invitated you in </span>
							<span style="color: brown"> {{ message.topic_name }} </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- pending in challenger -->
						<b-button
							v-if='userId === message.challenger_id && message.status === "pending"'
							:disabled='true'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<span style="color: #f59300"> You invited </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challengee_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challengee_name }} </span>
							</b-badge>
							<span style="color: #f59300"> a new challenge in </span>
							<span style="color: brown"> {{ message.topic_name }} </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- rejected/accepted in challengee -->
						<b-button
							v-if='userId === message.challengee_id && (message.status === "rejected" || message.status === "accepted")'
							:disabled='true'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<span style="color: #f59300"> You {{message.status}} </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challenger_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challenger_name }} </span>
							</b-badge>
							<span style="color: #f59300"> 's invitation in </span>
							<span style="color: brown"> {{ message.topic_name }} </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- rejected/accepted in challenger -->
						<b-button
							v-if='userId === message.challenger_id && (message.status === "rejected" || message.status === "accepted")'
							:disabled='message.status === "rejected"'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challengee_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challengee_name }} </span>
							</b-badge>
							<span style="color: #f59300"> {{message.status}} </span>
							<span style="color: #f59300"> your invitation in </span>
							<span style="color: brown"> {{ message.topic_name }} </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- half_completed(by challengee) in challenger -->
						<b-button
							v-if='userId === message.challenger_id && message.status === "half_completed"'
							:disabled='false'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challengee_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challengee_name }} </span>
							</b-badge>
							<span style="color: #f59300"> has completed the dual on </span>
							<span style="color: brown"> {{ message.topic_name }} </span>
							<span style="color: #f59300"> Now it's your turn. </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- half_completed(by challengee) in challengee -->
						<b-button
							v-if='userId === message.challengee_id && message.status === "half_completed"'
							:disabled='true'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<span style="color: #f59300"> You've completed </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challenger_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challenger_name }} </span>
							</b-badge>
							<span style="color: #f59300"> 's challenge on </span>
							<span style="color: brown"> {{ message.topic_name }} </span>
							<span style="color: #f59300"> successfully! </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- full_completed(by challengee) in challengee/challenger -->
						<b-button
							v-if='(userId === message.challengee_id || userId === message.challenger_id) && message.status === "full_completed"'
							:disabled='false'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<span style="color: #f59300"> You and  </span>
							<b-badge v-if="userId === message.challengee_id" mt-2 :to="{ name: 'Profile', params: { id: `${message.challenger_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challenger_name }} </span>
							</b-badge>
							<b-badge v-else mt-2 :to="{ name: 'Profile', params: { id: `${message.challengee_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challengee_name }} </span>
							</b-badge>
							<span style="color: #f59300"> both completed a dual on </span>
							<span style="color: brown"> {{ message.topic_name }} </span>
							<span style="color: #f59300"> successfully! </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>
						<!-- archived in challengee/challenger -->
						<b-button
							v-if='(userId === message.challengee_id || userId === message.challenger_id) && message.status === "archived"'
							:disabled='true'
							block
							variant="light"
							class="shadow-sm font-weight-bold text-left shadow hover-zoom"
							@click.prevent="selectMessage(message)"
							v-bind:class="{ 'highlight' : selected_message && message.index === selected_message.index}"
						> 
							<span class="dot"> {{ index + 1 }} </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challenger_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challenger_name }} </span>
							</b-badge>
							<span style="color: #f59300"> 's invitation to </span>
							<b-badge mt-2 :to="{ name: 'Profile', params: { id: `${message.challengee_id}` } }" variant="light">
								<span style="color: blue"> {{ message.challengee_name }} </span>
							</b-badge>
							<span style="color: #f59300"> on </span>
							<span style="color: brown"> {{ message.topic_name }} </span>
							<span style="color: #f59300"> archived due to inactivity </span>

							<b-icon :icon="iconInfo(message.status)" :variant="variantInfo(message.status)" v-b-popover.hover="message.status"></b-icon>
							<b-badge mt-2 variant="light"> {{ message.last_accessed }} </b-badge>
						</b-button>						
					</b-col>
				</b-row>
			</b-card-body>
		</b-card>
	</div>
</template>

<script>
export default {
  data() {
	return {
		selected_message: null
	};
  },
  props: {
	userId: {
		type: Number,
		required: true,
	},
	userName: {
		type: String,
		required: true
	},
	messages: {
		type: Array,
		required: true
    }
  },
  methods: {
	selectMessage(message) {
		this.selected_message = message;
		this.$emit('choose-a-message', this.selected_message);
	},
	iconInfo(status) {
		var icon = 'error';
		if (status === "pending") icon = 'exclamation-circle-fill';
		else if (status === "accepted") icon = 'droplet';
		else if (status === "rejected") icon = 'x-circle';
		else if (status === "half_completed") icon = 'droplet-half';
		else if (status === "full_completed") icon = "droplet-fill";
		else if (status === "archived") icon = "archive";
		return icon;
	},
	variantInfo(status) {
		var variant = '';
		if (status === "pending") variant = 'info';
		else if (status === "rejected") variant = 'danger';
		return variant;
	},
  }, 
  computed: {
  }
};
</script>

<style lang="scss" scoped>
	.inv {
		color: rgb(218, 255, 148);
	}
	.message-body {
		border-radius: 5px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
		border: 1px solid #ecaffb;
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
		border: 1px solid #8cb992;
		display: inline-block;
		text-align: center;
	}
	.highlight {
		border: 2px inset green
	}
</style>