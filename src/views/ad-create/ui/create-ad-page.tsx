'use client';

import { AdCreatePage } from '@features/ad-create';
import { BottomSheet, Button } from '@shared/ui';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const CreateAdPage = () => {
	const router = useRouter();

	const handleClose = () => {
		router.back();
	};

	return (
		<BottomSheet
			defaultOpen={true}
			dismissible={false}
			open={true}
			handle={false}
			onClose={handleClose}
		>
			<header className={'flex justify-center items-center relative'}>
				<h1 className={'text-center text-lg'}>Новое объявление</h1>
				<Button
					className={'absolute right-0'}
					variant={'ghost'}
					onClick={handleClose}
				>
					Закрыть
					<X className={'h-4 w-4 ml-2'} />
				</Button>
			</header>
			<AdCreatePage />
		</BottomSheet>
	);
};
