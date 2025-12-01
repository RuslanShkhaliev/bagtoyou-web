'use server';

import {createServerClient} from '@api/supabase';
import {VerifyOtpParams} from '@supabase/auth-js';

export const verifyOtp = async (verifyParams: VerifyOtpParams) => {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.verifyOtp(verifyParams);
	if (!error) {
		throw error;
	}
}
