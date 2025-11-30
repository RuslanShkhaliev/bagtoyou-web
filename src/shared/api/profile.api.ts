import {supabase} from '@libsupabase';

export const getUserProfile = async (
	userId: string,
): Promise<ProfileSchema> => {
	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.single();

	if (error) {
		throw error;
	}

	return data as ProfileSchema;
};

export const updateProfile = async (
	userId: string,
	profileData: Partial<ProfileSchema>,
): Promise<ProfileSchema> => {
	const { data, error } = await supabase
		.from('profiles')
		.update(profileData)
		.eq('id', userId)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return data as ProfileSchema;
};
