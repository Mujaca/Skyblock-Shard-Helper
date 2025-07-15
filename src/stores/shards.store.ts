import { defineStore } from 'pinia'
import shards from '../assets/data/shards.json'

export const useShardStore = defineStore('shard', {
	state: () => {
		return {
			shard: shards.shards
		}
	},
	actions: {

	},
	getters: {
		getShardArray() {
			return Object.values(shards.shards);
		},
		getShardById: (state) => {
			return (id: string) => {
				return Object.values(state.shard).find(shard => shard.id === id);
			}
		}
	}
})