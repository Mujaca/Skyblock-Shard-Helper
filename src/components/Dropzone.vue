<template>
	<div class="dropzone" @drop="onDrop" @dragover.prevent @click="onClick">
		<div class="dropzone-inner">
			<Shard v-if="droppedShard" :id="droppedShard" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref, Ref } from 'vue';
import Shard from './Shard.vue';
import { useShardStore } from '../stores/shards.store';

const shardStore = useShardStore();

const droppedShard: Ref<any | null> = ref(null);

function onDrop(event: DragEvent) {
	event.preventDefault();
	const data: string = event.dataTransfer?.getData('text/plain') as string;
	if (!data) return;

	droppedShard.value = null;

	nextTick(() => {
		droppedShard.value = data;
		shardStore.setFusionTarget(shardStore.getShardById(data));
	});
}

function onClick(event: MouseEvent) {
	event.preventDefault();
	droppedShard.value = null;
	shardStore.setFusionTarget(undefined);
}
</script>

<style lang="scss" scoped>
.dropzone {
	width: 64px;
	height: 64px;
	padding: 16px;

	.dropzone-inner {
		width: 72px;
		height: 72px;

		box-shadow:
			inset 0 4px 12px 0 #000a, // dunkler innerer Schatten unten
			inset 0 -2px 8px 0 #222a, // dunkler innerer Schatten oben
			inset 0 1.5px 0 0 #fff3; // leichter Glanz oben

		background-color: #393939;
		border-radius: 8px;
	}
}
</style>
