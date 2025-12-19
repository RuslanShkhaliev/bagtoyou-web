import { cn } from '@lib/utils';
import { FC } from 'react';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemProps,
	ItemTitle,
} from './item';

export interface ListItemProps extends ItemProps {
	media?: React.ReactNode;
	title: string;
	description: string;
	badge?: React.ReactNode;
	iconRight?: React.ReactNode;
}

export const ListItem: FC<ListItemProps> = ({
	title,
	description,
	iconRight,
	media,
	size = 'sm',
	badge,
	className,
	variant = 'default',
	...props
}) => {
	return (
		<Item
			variant={variant}
			size={size}
			className={cn(
				'rounded-none',
				'cursor-pointer hover:bg-muted transition-colors duration-300',
				className,
			)}
			{...props}
		>
			{media && (
				<ItemMedia
					variant={'image'}
					className={'items-center flex h-full'}
				>
					{media}
				</ItemMedia>
			)}
			<ItemContent>
				<ItemTitle className='text-[16px] font-semibold'>
					{title}
				</ItemTitle>
				{description && (
					<ItemDescription>{description}</ItemDescription>
				)}

				{badge}
			</ItemContent>

			{iconRight && <ItemActions>{iconRight}</ItemActions>}
		</Item>
	);
};
