import shardData from '../assets/data/shards.json';
import { rarityInOrder } from './rarity';

export const possibleFusions = new Map<string, fusion[]>();
const shardArray = Object.values(shardData.shards);

for (const shard of shardArray) {
	const fusions = [];

	for(let fusion of shard.fusion) {
		if(checkIfFusionIsEmpty(fusion)) continue;
		fusions.push(fusion);
	}
	if( fusions.length == 0) continue;

	possibleFusions.set(shard.productID, fusions);
}

function checkIfFusionIsEmpty(fusion: fusion): boolean {
	return !fusion.type && !fusion.rarity && !fusion.family && !fusion.shards;
}

export function getFusionsForShard(shardId: string): fusion[] | undefined {
	if (possibleFusions.has(shardId)) {
		return possibleFusions.get(shardId);
	}
	return undefined;
}

export function getShardOfFusion(shardToBeFused: string): shard[][] {
	if(!possibleFusions.has(shardToBeFused)) return [];

	const fusions = possibleFusions.get(shardToBeFused);
	if (!fusions) return [];

	const shards: shard[][] = [];
	for (const fusion of fusions) {
		const possibleShards = shardArray.filter((shard) => {
			let shardIsValid = true;

			if (fusion.type && shard.type !== fusion.type) {
				shardIsValid = false;
			}

			if (fusion.family && !shard.family.includes(fusion.family)) {
				shardIsValid = false;
			}

			if (fusion.shards) {
				if(typeof fusion.shards === 'string') {
					if (shard.name !== fusion.shards) {
						shardIsValid = false;
					}
				}else if (Array.isArray(fusion.shards)) {
					if (!fusion.shards.includes(shard.name)) {
						shardIsValid = false;
					}
				}
			}

			if (fusion.rarity) {
				if (fusion.rarity.includes('+')) {
					const baseRarity = fusion.rarity.replace('+', '');
					if (rarityInOrder[shard.rarity] < rarityInOrder[baseRarity]) {
						shardIsValid = false;
					}
				} else {
					if (shard.rarity !== fusion.rarity) {
						shardIsValid = false;
					}
				}
			}


			return shardIsValid;
		})
		shards.push(possibleShards as shard[]);
	}

	return shards;
}