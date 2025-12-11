export * from '@lib/geoDb/model/types';
import {createGeoApiClient} from '@/shared/lib/geoDb/client';

export const geoApiClient = createGeoApiClient({
	apiKey: process.env.NEXT_PUBLIC_RAPID_API_KEY!,
	host: process.env.NEXT_PUBLIC_RAPID_API_HOST!,
	baseUrl: process.env.NEXT_PUBLIC_RAPID_API_URL!,
});
