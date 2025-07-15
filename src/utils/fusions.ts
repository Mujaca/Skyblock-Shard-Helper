import { useShardStore } from '../stores/shards.store';

const shards = useShardStore();

export const possibleFusions = new Map<string, fusion[]>();

for (const shard of shards.getShardArray) {
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

export function getShardOfFusion(shardToBeFused: string): string[][] {
	const fusions = possibleFusions.get(shardToBeFused);
	console.log('getShardOfFusion', shardToBeFused, fusions);
	if (!fusions) return [];

	const shardsToFuse: string[][] = [];
	for (let i = 0; i < fusions.length; i++) {
		const fusion = fusions[i];
		shardsToFuse[i] = [];

		const possibleShards:shard[] = [];
		const keysToCompare = [];

		if(fusion.family) {
			possibleShards.push(...shards.getShardsByFamily(fusion.family))
			keysToCompare.push('family');
		}

		if(fusion.type) {
			possibleShards.push(...shards.getShardsByType(fusion.type))
			keysToCompare.push('type');
		}

		if(fusion.rarity) {
			possibleShards.push(...shards.getShardsByRarity(fusion.rarity))
			keysToCompare.push('rarity');
		}

		if(fusion.shards) {
			if (typeof fusion.shards === 'string') {
				possibleShards.push(shards.getShardByName(fusion.shards) as shard);
			} else {
				for (const shardId of fusion.shards) {
					possibleShards.push(shards.getShardByName(shardId) as shard);
				}
			}
			keysToCompare.push('shards');
		}

		for(const shard of possibleShards) {
			let matching = true;
			for(const key of keysToCompare) {
				if (typeof shard[key as keyof shard] === 'string') {
					// If the shard property is a string, compare directly
					if (shard[key as keyof shard] !== fusion[key as keyof fusion]) {
						matching = false;
						break;
					}
				}else{
					// If the shard property is an array, check if it includes the fusion property
					if (typeof fusion[key as keyof fusion] === 'string') {
						// @ts-ignore
						if (!shard[key as keyof shard].includes(fusion[key as keyof fusion] as string)) {
							matching = false;
							break;
						}
					}
					else if (Array.isArray(fusion[key as keyof fusion])) {
						for (const item of fusion[key as keyof fusion] as string[]) {
							// @ts-ignore
							if (!shard[key as keyof shard].includes(item)) {
								matching = false;
								break;
							}
						}
					}
				}
			}
		}

	}
	console.log(shardsToFuse);
	return shardsToFuse;
}
