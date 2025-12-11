import {GeoDbModel} from '@lib/geoDb';

export type CityItem = Pick<GeoDbModel, 'city' | 'country'>
