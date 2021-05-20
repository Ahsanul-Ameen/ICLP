<template>
	<b-container>
		<h2 class="text-center mt-4">
			<b-icon icon="grip-horizontal" class="text-primary"></b-icon>
				Dual Challenge
			<b-icon icon="grip-horizontal" class="text-primary"></b-icon>
		</h2>
		<div class="mx-5">
			<b-row offset-md="1" class="pb-5 pt-5">
				<b-card
					tag="article"
					style="max-width: 60rem;"
					class="mx-auto place"
					v-b-popover.hover="'Feeling energetic?'"
				>
					<h4 class="font-weight-bold" font-weight-bold>
						<b-icon icon="arrow90deg-right" class="text-primary"></b-icon>
						Throw A Challenge
					</h4>
					
					<b-card-text class="pb-2 pl-4 pt-2">
						Here you will be able to throw a challenge towards your opponent who might be interested in the same topic.
						It may take some time to find your opponent. If you want quick evaluation browse topics to accept a
						challenge. You might find your interested topic in the available topics of that section too!!
					</b-card-text>
					<b-button class="ml-4" variant="primary" :to="{ name: 'DualTopics' }">Browse Topics</b-button>
				</b-card>
			</b-row>
			
			<b-row offset-md="1" class="pb-5 pt-5">
				<b-card
					tag="article"
					style="max-width: 60rem;"
					class="mx-auto place"
					v-b-popover.hover="'Wanna revenge?'"
				>
					<h4 class="font-weight-bold" font-weight-bold>
						<b-icon icon="arrow90deg-down" class="text-primary"></b-icon>
						Accept A Challenge
					</h4>
					
					<b-card-text class="pb-2 pl-4 pt-2">
						If you want quick evaluation, select your interested topic from the available topics to accept challenge and
						compete against your opponent.
					</b-card-text>
					<b-button class="ml-4" variant="primary" :to="{ name: 'Invitations' }">See Challenges</b-button>
				</b-card>
			</b-row>
			
		</div>
	</b-container>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
	.place {
		border-radius: 25px;
		border: 2px solid #ffa358;
	}
	.place:hover {
		background-color:rgb(253, 243, 223)
	}
</style>