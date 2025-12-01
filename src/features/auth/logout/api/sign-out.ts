"use server";

import {createServerClient} from '@api/supabase';
import {revalidatePath} from 'next/cache';

export async function signOut() {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}

	revalidatePath("/", "layout");
}
