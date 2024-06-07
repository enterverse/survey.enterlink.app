export interface PersonalityTrait {
	key: string;
	name: string;
	description: string;
}

export interface Personality {
	key: string;
	name: string;
	description: string;
	shortDescription: string;
	traits: Array<PersonalityTrait>;
	activities: Array<string>;
	values: Array<string>;
	summary: string;
	iconUrl: string;
	similarTypes: Array<string>;
	goldenPair: string;
}
