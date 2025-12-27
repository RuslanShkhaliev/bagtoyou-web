'use client';

import { BottomSheet } from '@shared/ui';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function AccountSettingsLayout({ children }: PropsWithChildren) {
	const router = useRouter();
	const handleClose = () => {
		router.back();
	};
	return (
		<BottomSheet
			open
			defaultOpen={true}
			handler={false}
			onClose={handleClose}
		>
			<div className='flex flex-col h-full'>
				{/* Шапка */}
				<div className='flex items-center gap-4 pb-4 border-b'>
					<button
						onClick={handleClose}
						className='flex items-center gap-2 text-muted-foreground hover:text-foreground'
					>
						<ArrowLeft className='h-5 w-5' />
					</button>
					<h3 className='text-md font-semibold'>Настройки профиля</h3>
				</div>

				{/* Контент */}
				<div className='flex-1 overflow-y-auto py-6'>{children}</div>
			</div>
		</BottomSheet>
	);
}
