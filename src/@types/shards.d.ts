type shard = {
    productID: string;
    id: string;
    name: string;
    family: string[];
    type: string;
    rarity: string;
    fusion: fusion[];
};

type fusion = {
	type: string;
	rarity: string;
	family: string;
	shards: string | string[];
};
