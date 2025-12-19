import { cn } from '@lib/utils';
import Link from 'next/link';
import React, { FC } from 'react';

export interface TabCreateAdProps {
	icon: React.ReactNode;
	title: string;
	active?: boolean;
	onClick: string;
}
export const TabCreateAd: FC<TabCreateAdProps> = ({ icon, title }) => {
	return (
		<Link
			href={'/add'}
			className={'flex-1 flex items-end h-full justify-center w-full'}
		>
			<div className={`flex flex-col items-center gap-1`}>
				<div
					className={cn(
						'absolute -top-1/2',
						'flex items-center justify-center',
						'aspect-square w-[50px] bg-green-500 rounded-full',
					)}
				>
					{icon}
				</div>

				<span className={'text-xs text-gray-500'}>{title}</span>
			</div>
		</Link>
	);
};
