export * from './types';
import { GeoDbApiClient } from '@lib/geoDb/client';

export const geoApiClient = new GeoDbApiClient({
	apiKey: process.env.EXPO_PUBLIC_RAPID_API_KEY,
	host: process.env.EXPO_PUBLIC_RAPID_API_HOST,
	baseUrl: process.env.EXPO_PUBLIC_RAPID_API_URL,
});
