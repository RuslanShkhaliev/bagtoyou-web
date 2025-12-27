import { createBrowserClient } from '@api/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'node:crypto';

type AvailableBuckets = 'media' | 'avatars' | 'ads';

interface UploadFileOptions {
	bucket: AvailableBuckets;
	folder: string;
	file: File;
	originalName?: string;
}

interface UploadFileResult {
	id: string;
	path: string;
	fullPath: string;
	publicUrl: string;
}
export const uploadFile = async (
	supabase: SupabaseClient,
	options: UploadFileOptions,
): Promise<UploadFileResult> => {
	const { bucket, folder, file } = options;
	const fileName = generateFileName(file.name);
	const filePath = `${folder}/${fileName}`;

	const { data: uploadData, error: uploadError } = await supabase.storage
		.from(bucket)
		.upload(filePath, file, {
			contentType: file.type,
			upsert: false,
			cacheControl: '3600',
		});

	if (uploadError) {
		throw new Error(`Ошибка загрузки файла: ${uploadError.message}`);
	}

	// Получаем публичный URL
	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(uploadData.path);

	return { ...uploadData, publicUrl };
};

export const uploadMedia = async (file: File) => {
	const supabase = createBrowserClient();

	const { data: user, error } = await supabase.auth.getUser();

	if (error || !user.user) {
		throw error;
	}
	const { id } = user.user;

	return uploadFile(supabase, {
		bucket: 'ads',
		folder: id,
		file,
	});
};
export const generateFileName = (originalName?: string) => {
	const ext = originalName
		? originalName.split('.').pop()?.toLowerCase()
		: 'jpg';

	const timestamp = Date.now();

	const shortUuid = crypto.randomUUID().split('-')[0];

	return sanitizeFileName(`${timestamp}-${shortUuid}.${ext}`);
};

export const sanitizeFileName = (fileName: string): string => {
	return fileName
		.toLowerCase()
		.replace(/[^a-z0-9.-]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
};
