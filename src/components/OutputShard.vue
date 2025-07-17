<template>
	<div class="output-shard-container">
		<div class="output-shard" @click="showOutputList = !showOutputList">
			<Shard v-if="selectedShard" :id="selectedShard.productID" />
		</div>
		<div class="output-shard-overview" v-if="showOutputList">
			<Shard class="output-shard-item" v-for="result in possibleResults" :key="result.productID" :id="result.productID" @click="changeSelectedShard(result)"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import Shard from './Shard.vue';

const props = defineProps<{
	possibleResults: shard[];
}>();

const selectedShard = ref<shard | null>(props.possibleResults[0]);
const showOutputList = ref(false);

function changeSelectedShard(shard: shard) {
	selectedShard.value = null;
	nextTick(() => {
		selectedShard.value = shard;
		showOutputList.value = false;
	});
}

</script>

<style lang="scss" scoped>

.output-shard-container {
	position: relative;
	
	.output-shard {
		&:hover {
			cursor: pointer;
		}
	}

	.output-shard-overview {
		position: absolute;
		left: 100%;
		top: 0;
		margin-left: 8px;

		display: flex;
		flex-direction: column;
		gap: 8px;
		max-height: 30vh;
		overflow-y: auto;
		overflow-x: visible;

		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}

		.output-shard-item {
			overflow: visible;

			&:hover {
				cursor: pointer;
			}	
		}
	}
}

</style>