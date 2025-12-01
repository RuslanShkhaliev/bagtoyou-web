import {useMutation} from '@tanstack/react-query';
import {createClient} from '@utils/supabase/client';


interface SignUpCredentials {
	email: string;
	password: string;
	name: string;
}
export const useSignUp = () => {
	const supabase = createClient()

	return useMutation({
		mutationFn: async (credentials: SignUpCredentials) => {
			const { error, data } = await supabase.auth.signUp({
				...credentials,
				options: {
					data: {
						name: credentials.name,
					},
					emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
				},
			});

			if (error) {
				throw error;
			}

			return data;
		}
	})
}
