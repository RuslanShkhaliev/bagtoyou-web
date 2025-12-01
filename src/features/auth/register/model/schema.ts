import {z} from 'zod';

export const registerFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.email(),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	})
});

export type RegisterValuesType = z.infer<typeof registerFormSchema>;
