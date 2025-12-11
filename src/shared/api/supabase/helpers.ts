import {createBrowserClient} from '@api/supabase/client';

export const getPublicUrl = (bucketId: string, filePath: string) => {
	const supabase = createBrowserClient()
	return supabase.storage.from(bucketId).getPublicUrl(filePath).data
		.publicUrl;
};
export const getMediaUrl = (filePath: string) => {
	return getPublicUrl('media',filePath);
}
