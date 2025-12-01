export interface GeoDbCityParams {
	namePrefix?: string;
	limit?: number;
	offset?: number;
	sort?: string;
	types?: string;
	countryIds?: string;
	minPopulation?: number;
	languageCode?: string;
}

export interface GeoDbModel {
	id: number;
	wikiDataId: string;
	type: string;
	city: string;
	name: string;
	country: string;
	countryCode: string;
	region: string;
	regionCode: string;
	regionWdId: string;
	latitude: number;
	longitude: number;
	population: number;
}

export interface GeoDbCitiesResponse {
	data: GeoDbModel[];
	metadata: {
		currentOffset: number;
		totalCount: number;
	};
}
