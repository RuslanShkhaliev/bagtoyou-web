import {supabase} from '@libsupabase';
import {SignInWithPasswordCredentials} from '@supabase/supabase-js';

export const signInWithEmailAndPassword = async (
	credentials: SignInWithPasswordCredentials,
) => {
	const { data, error } = await supabase.auth.signInWithPassword(credentials);

	if (error) {
		console.error('Error signing in:', error);
		throw error;
	}

	return data;
};

interface SignUpCredentials {
	email: string;
	password: string;
	name: string;
}

export const signUpWithEmailAndPassword = async (
	credentials: SignUpCredentials,
) => {
	const { data, error } = await supabase.auth.signUp({
		email: credentials.email,
		password: credentials.password,
		options: {
			data: {
				name: credentials.name,
			},
		},
	});

	if (error) {
		console.error('Error signing up:', error);
		throw error;
	}

	return data;
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('Error signing out:', error);
		throw error;
	}
};

export const getUser = async () => {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) {
		console.error('Error getting user:', error);
		throw error;
	}
	return user;
};
