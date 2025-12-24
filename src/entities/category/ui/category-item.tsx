import { cn } from '@lib/utils';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@shared/ui';
import { ChevronRight, Circle } from 'lucide-react';
import { FC, useCallback } from 'react';
import { MappedCategory } from '../model/types';

interface CategoryItemProps {
	active?: boolean;
	data: MappedCategory;
	onClick: (category: MappedCategory) => void;
}
export const CategoryItem: FC<CategoryItemProps> = ({
	data,
	active,
	onClick,
}) => {
	const hasChildren = Boolean(data.children?.length);
	const handleClick = useCallback(() => {
		onClick(data);
	}, [data, onClick]);
	return (
		<Item
			onClick={handleClick}
			className={cn('items-center hover:bg-accent/50 border-0')}
		>
			<ItemContent className='flex-1 gap-1'>
				<ItemTitle className='font-medium text-sm leading-tight'>
					{data.name}
				</ItemTitle>
				{hasChildren && (
					<ItemDescription className='text-xs text-muted-foreground'>
						{data.children.length}{' '}
						{data.children.length === 1 ? 'категория' : 'категории'}
					</ItemDescription>
				)}
			</ItemContent>

			{hasChildren ? (
				<ChevronRight className='h-5 w-5 flex-shrink-0 text-muted-foreground' />
			) : (
				<Circle className='h-5 w-5 flex-shrink-0 text-muted-foreground' />
			)}
		</Item>
	);
};
