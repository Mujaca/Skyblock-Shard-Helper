<template>
	<div class="shard" draggable="true" @dragstart="onDragStart" :title="name">
		<img draggable="false" :src="`/images/shards/${image}.png`" :alt="name" @error="onPictureError" />
	</div>
</template>

<script setup lang="ts">

const props = defineProps<{
	id: string;
	name: string;
	image: string;
}>();

function onDragStart(event: DragEvent) {
	event.dataTransfer?.setData('text/plain', props.id);
}

function onPictureError(event: Event) {
	const target = event.target as HTMLImageElement;
	target.src = '/images/missing.png';
}

</script>

<style lang="scss" scoped>
.shard {

	width: 32px;
	height: 32px;

	padding: 4px;

	background-color: #4a4a4a;
	border-radius: 8px;

	transition: background-color 0.2s ease-in-out;

	&:hover {
		//cursor: pointer;
		background-color: #595959;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		user-select: none;
	}
}
</style>