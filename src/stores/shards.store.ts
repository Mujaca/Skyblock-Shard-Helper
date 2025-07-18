import { defineStore } from 'pinia'
import shards from '../assets/data/shards.json'
import { rarityInOrder } from '../utils/rarity';
import { getShardOfFusion } from '../utils/fusions';

export const useShardStore = defineStore('shard', {
	state: () => {
		return {
			shard: shards.shards as Record<string, shard>,
            fusionTarget: undefined as shard | undefined,
            fusionResults: [] as shard[][],
            searchText: "",
            searchRarity: "all",
            searchFamily: "all",
            searchType: "all"
		}
	},
	actions: {
        setFusionTarget(shard: shard | undefined) {
            this.fusionTarget = shard;

            if(shard) {
                return this.fusionResults = getShardOfFusion(shard.productID);
            }

            return this.fusionResults = [];
        },
        setSearchText(text: string) {
            this.searchText = text;
        },
        setSearchRarity(rarity: string) {
            this.searchRarity = rarity;
        },
        setSearchFamily(family: string) {
            this.searchFamily = family;
        },
        setSearchType(type: string) {
            this.searchType = type;
        }
	},
	getters: {
		getShardArray(): shard[] {
			return Object.values(shards.shards);
		},
        getFilteredArray(): shard[] {
            return Object.values(shards.shards).filter(shard => {
                let matches = false;
                
                if(this.searchText && (
                    shard.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                    shard.productID.toLowerCase().includes(this.searchText.toLowerCase()) ||
                    shard.attribute.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                    shard.attribute.description.toLowerCase().includes(this.searchText.toLowerCase())
                )) matches = true;

                if(this.searchRarity !== "all" && shard.rarity === this.searchRarity) matches = true;
                if(this.searchFamily !== "all" && shard.family.includes(this.searchFamily)) matches = true;
                if(this.searchType !== "all" && shard.type === this.searchType) matches = true;

                if(!this.searchText && this.searchRarity === "all" && this.searchFamily === "all" && this.searchType === "all") matches = true;
                return matches;
            });
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