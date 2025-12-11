import {GeoDbCityParams, ResponseGeoDbCities} from '@lib/geoDb/model/types';


interface GeoDbApiClientOptions {
	baseUrl: string;
	apiKey: string;
	host: string;
}

export class GeoDbApiClient {
	apiKey: string;
	host: string;
	baseUrl: string;
	constructor(options: GeoDbApiClientOptions) {
		Object.entries(options).forEach(([key, value]) => {
			if (!value) {
				throw new Error(
					`GeoDbApiClient Error: missing required option ${key}`,
				);
			}
		});
		this.apiKey = options.apiKey;
		this.host = options.host;
		this.baseUrl = options.baseUrl;
	}

	public getCities = async (
		params: GeoDbCityParams,
	): Promise<ResponseGeoDbCities> => {
		const headers = {
			'x-rapidapi-key': this.apiKey,
			'x-rapidapi-host': this.host,
		};
		const response = await fetch(
			`${this.baseUrl}?${this.queryBuilder(params)}`,
			{
				method: 'GET',
				headers,
			},
		);

		if (!response.ok) {
			throw new Error(`Fetch cities error! status: ${response.status}`);
		}

		const data: ResponseGeoDbCities = await response.json();

		return data;
	};

	private queryBuilder(params: GeoDbCityParams): string {
		const queryParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				queryParams.append(key, value.toString());
			}
		});

		return queryParams.toString();
	}
}

export const createGeoApiClient = (options: GeoDbApiClientOptions): GeoDbApiClient => {
	return new GeoDbApiClient(options);
}
