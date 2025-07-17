<template>
	<div class="main-container">
		<div class="shard-list">
			<Shard
				v-for="shard in shardStore.getShardArray"
				:key="shard.productID"
				:id="shard.productID" />
		</div>
		<div class="fusion-area">
			<div class="input-area">
				<Dropzone/>
			</div>
			<p class="direction-indicator">
				<img :src="arrowRight">
			</p>
			<div class="output-area">
				<OutputShard
				v-if="shardStore.fusionResults.length > 0"
				v-for="result in shardStore.fusionResults"
				:possibleResults="result" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import arrowRight from './assets/images/arrow-right-solid.svg';

import Dropzone from './components/Dropzone.vue';
import OutputShard from './components/OutputShard.vue';
import Shard from './components/Shard.vue';
import { useShardStore } from './stores/shards.store';

const shardStore = useShardStore();

</script>

<style lang="scss" scoped>

.main-container {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
}

.shard-list {
	width: 45%;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	overflow-y: auto;
	overflow-x: visible;
	position: relative;
	height: 100%;
	max-height: 90vh;
}

.fusion-area {
	width: 25%;
	height: 100%;
	min-height: 90vh;
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: .5fr 1fr .5fr;
	place-items: center;

 	.input-area {
		grid-column: 1;
		grid-row: 2;
	}

	.direction-indicator {
		grid-row: 2;
		grid-column: 2;
		width: 96px;
		height: 96px;
	}

	.output-area {
		display: flex;
		flex-direction: column;
		gap: 8px;
		grid-column: 3;
		grid-row: 2;
	}

	img {
		filter: invert(1);
		max-width: 100%;
		max-height: 100%;
	}
}
</style>