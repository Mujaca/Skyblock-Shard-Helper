<template>
	<div
		class="dropzone"
		@drop="onDrop"
		@dragover.prevent>
		<div class="dropzone-inner">
			<Shard
				v-if="droppedShard"
				:id="droppedShard" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import Shard from './Shard.vue';
import { getShardOfFusion } from '../utils/fusions';

const droppedShard:Ref<any|null> = ref(null);

function onDrop(event: DragEvent) {
	event.preventDefault();
	const data = event.dataTransfer?.getData('text/plain');
	droppedShard.value = data;

    getShardOfFusion(data as string);
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

		background-color: #393939;
		border-radius: 8px;
	}
}

</style>
