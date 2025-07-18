<template>
	<div class="outer-shard">
		<div
			class="shard"
			draggable="true"
			@dragstart="onDragStart"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave">
			<img
				draggable="false"
				:src="`/images/shards/${shard?.name}.png`"
				:alt="shard?.name"
				@error="onPictureError" />
		</div>
		<div
			class="shard-description"
			:class="shard?.rarity.toLowerCase()"
			v-if="showDescription"
			:style="descriptionStyle">
			<h3 class="shard-name">{{ shard?.name }}</h3>
			<div class="shard-family-group">
				<h4
					class="shard-family"
					v-for="family in shard?.family">
					{{ family }}
				</h4>
			</div>
			<p class="effect-title"> {{ shard?.attribute.name }} </p>
			<p class="effect-description">{{ shard?.attribute.description }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useShardStore } from '../stores/shards.store';

const shardStore = useShardStore();

const props = defineProps<{
	id: string;
}>();

const showDescription = ref(false);
const descriptionStyle = ref<Record<string,string>>({});
const shard = ref(shardStore.getShardById(props.id));

function onDragStart(event: DragEvent) {
	event.dataTransfer?.setData('text/plain', props.id);
	showDescription.value = false;
}

// Compute and position description tooltip fixed relative to viewport
function handleMouseEnter(event: MouseEvent) {
	   const el = event.currentTarget as HTMLElement;
	   const rect = el.getBoundingClientRect();
	   descriptionStyle.value = {
	       position: 'fixed',
	       top: `${rect.top}px`,
	       left: `${rect.right + 4}px`,
	       zIndex: '200',
	       minWidth: '300px'
	   };
	   showDescription.value = true;
}

function handleMouseLeave() {
   showDescription.value = false;
}

function onPictureError(event: Event) {
	const target = event.target as HTMLImageElement;
	target.src = '/images/missing.png';
}
</script>

<style lang="scss" scoped>
.outer-shard {

	height: 72px;
	width: 72px;

	.shard-description {
		position: absolute;
		left: 100%;
		top: 0;
		z-index: 200;
		margin-left: 4px;
		min-width: 300px;

		background-color: #4a4a4a;
		padding: 8px;
		border-radius: 4px;

		.shard-family-group {
			display: flex;
			flex-direction: row;
			gap: 0.2rem;

			.shard-family {
				margin: 0;
				font-size: 0.8rem;
				color: #a1a1a1;

				&:not(:last-child)::after {
					content: '•';
					margin-left: 0.2rem;
				}
			}
		}

		.shard-name {
			margin: 0;
			font-weight: bold;
			font-size: 1.2rem;
			color: #d1d5d8;
		}

		.effect-title {
			margin-top: 0.2rem;
			margin-bottom: 0;
		}

		.effect-description {
			margin-top: 0;
			margin-bottom: 0;
			color: #d1d5d8;
		}

		&.common {
			border: 1px solid #d1d5d8;

			.shard-name {
				color: #d1d5d8;
			}
		}

		&.uncommon {
			border: 1px solid #41a85f;

			.shard-name {
				color: #41a85f;
			}
		}

		&.rare {
			border: 1px solid #2c82c9;

			.shard-name {
				color: #2c82c9;
			}
		}

		&.epic {
			border: 1px solid #9365b8;

			.shard-name {
				color: #9365b8;
			}
		}

		&.legendary {
			border: 1px solid #fac51c;

			.shard-name {
				color: #fac51c;
			}
		}
	}
}

.shard {
	width: 64px;
	height: 64px;

	padding: 4px;

	background-color: #4a4a4a;
	border-radius: 8px;

	transition: background-color 0.2s ease-in-out;

	 box-shadow: 0 4px 12px 0 #000a, 0 1.5px 0 0 #222, 0 0.5px 0 0 #fff2 inset;

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
