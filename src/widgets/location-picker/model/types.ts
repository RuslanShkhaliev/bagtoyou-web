import {GeoDbModel} from '@lib/geoDb';


export interface Locations {
	from: GeoDbModel | null;
	to: GeoDbModel | null;
}
export interface LocationsErrors {
	from?: string;
	to?: string;
}

