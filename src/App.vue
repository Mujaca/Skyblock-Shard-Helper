<template>
	<div class="main-container">
		<div class="shard-list">
			<Shard v-for="shard in shardStore.getShardArray" :key="shard.productID" :id="shard.productID" :name="shard.name" :image="shard.name" />
		</div>
		<br>
		<div class="dropzone" @drop="onDrop" @dragover.prevent>
			<div class="dropzone-inner"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Shard from './components/Shard.vue';
import { useShardStore } from './stores/shards.store';

const shardStore = useShardStore();
function onDrop(event: DragEvent) {
	event.preventDefault();
	const data = event.dataTransfer?.getData('text/plain');
	console.log('Gedroppt:', data);
}
;

</script>


<style lang="scss" scoped>

.shard-list {
	width: 35%;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	overflow-y: auto;
}

.dropzone {
	width: 32px;
	height: 32px;
	padding: 16px;

	transform: translate(-16px, -16px);

	.dropzone-inner {
		width: 32px;
		height: 32px;

		padding: 4px;
		background-color: #393939;
		border-radius: 8px;
	}
}
</style>