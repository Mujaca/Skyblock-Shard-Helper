import { defineStore } from 'pinia'
import shards from '../assets/data/shards.json'
import { rarityInOrder } from '../utils/rarity';

export const useShardStore = defineStore('shard', {
	state: () => {
		return {
			shard: shards.shards as Record<string, shard>
		}
	},
	actions: {

	},
	getters: {
		getShardArray(): shard[] {
			return Object.values(shards.shards);
		},
		getShardById: (state) => {
			return (id: string) => {
				return Object.values(state.shard).find(shard => shard.productID === id);
			}
		},
        getShardByName: (state) => {
            return (name: string) => {
                return Object.values(state.shard).find(shard => shard.name.toLowerCase() === name.toLowerCase());
            }
        },
        getShardsByFamily: (state) => {
            return (family: string) => {
                return Object.values(state.shard).filter(shard => shard.family.includes(family));
            }
        },
        getShardsByType: (state) => {
            return (type: string) => {
                return Object.values(state.shard).filter(shard => shard.type === type);
            }
        },
        getShardsByRarity: (state) => {
            return (rarity: string) => {
                if(rarity.includes('+')) {
                    const baseRarity = rarity.split('+')[0];
                    return Object.values(state.shard).filter(shard => rarityInOrder[shard.rarity] >= rarityInOrder[baseRarity]);
                }

                return Object.values(state.shard).filter(shard => shard.rarity === rarity);
            }
        }
	}
})