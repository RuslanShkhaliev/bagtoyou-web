'use server';

import {VerifyOtpParams} from '@supabase/auth-js';
import {createClient} from '@utils/supabase/server';

export const verifyOtp = async (verifyParams: VerifyOtpParams) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.verifyOtp(verifyParams);
	if (!error) {
		throw error;
	}
}
