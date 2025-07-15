<template>
	<div class="main-container">
		<div class="shard-list">
			<Shard
				v-for="shard in shardStore.getShardArray"
				:key="shard.productID"
				:id="shard.productID" />
		</div>
		<div class="input-area">
			<Dropzone/>
		</div>
	</div>
</template>

<script setup lang="ts">
import Dropzone from './components/Dropzone.vue';
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
	// overflow: auto;
	height: 100%;
	max-height: 90vh;
}
</style>