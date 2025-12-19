import { signOut } from '@features/auth/logout/api/sign-out';
import { Button } from '@shared/ui';

export const LogoutButton = () => {
	return (
		<form action={signOut}>
			<Button variant={'outline'}>Sign out</Button>
		</form>
	);
};
