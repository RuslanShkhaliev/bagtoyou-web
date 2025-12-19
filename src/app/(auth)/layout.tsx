import { Button } from '@shared/ui';
import { ChevronLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main className='min-h-screen'>
			<Button
				variant='outline'
				asChild
			>
				<Link
					href='/public'
					className='absolute left-4 top-4'
				>
					<ChevronLeftCircle className='mr-2 h-4 w-4' />
					Back
				</Link>
			</Button>
			{children}
		</main>
	);
}
