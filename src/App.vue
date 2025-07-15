<template>
	<div>
		<Shard id="1" name="Cod" image="cod" />
		<div class="dropzone" @drop="onDrop" @dragover.prevent>Drop-Ziel</div>
	</div>
</template>

<script setup lang="ts">
import Shard from './components/Shard.vue';

function onDrop(event: DragEvent) {
	event.preventDefault();
	const data = event.dataTransfer?.getData('text/plain');
	console.log('Gedroppt:', data);
}

</script>


<style lang="scss" scoped>
.dropzone {
	width: 32px;
	height: 32px;
	padding: 4px;
	background-color: #4a4a4a;
	border-radius: 8px;

}
</style>