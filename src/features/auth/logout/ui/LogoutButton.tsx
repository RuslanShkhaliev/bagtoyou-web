import {signOut} from '@features/auth/logout/api/sign-out';
import {Button} from '@ui/button';

export const LogoutButton = () => {
	return (
		<form action={signOut}>
			<Button variant={'outline'}>Sign out</Button>
		</form>
	)
};
