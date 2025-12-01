import {SignInWithPasswordCredentials} from '@supabase/supabase-js';
import {useMutation} from '@tanstack/react-query';
import {createClient} from '@utils/supabase/client';

export const useSignIn = () => {
	const supabase = createClient()
	return useMutation({
		mutationFn: async (credentials: SignInWithPasswordCredentials) => {
				const { data, error } = await supabase.auth.signInWithPassword(credentials);

				if (error) {
					console.error('Error signing in:', error);
					throw error;
				}

				return data;
		}
	})
}
