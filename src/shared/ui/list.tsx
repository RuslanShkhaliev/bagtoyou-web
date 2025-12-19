import { cn } from '@lib/utils';
import { ItemGroup, Separator } from '@shared/ui/index';
import { FC, Fragment, ReactNode } from 'react';

type SettingsGroupProps<T = any> =
	| {
			className?: string;
			items: T[];
			renderItem: (item: T, index: number) => ReactNode;
			children?: never;
			separator?: boolean | ReactNode;
	  }
	| {
			className?: string;
			items?: never;
			renderItem?: never;
			children: ReactNode;
			separator?: boolean | ReactNode;
	  };

export const List: FC<SettingsGroupProps> = ({
	items,
	className,
	children,
	renderItem,
	separator,
}) => {
	if (!items?.length && !children) return null;

	return (
		<ItemGroup
			className={cn(
				'rounded-lg bg-muted/50 p-0 flex flex-col transition-colors overflow-hidden',
				className,
			)}
		>
			{items?.length
				? items.map((item, index) => (
						<Fragment key={index}>
							{renderItem(item, index)}
							{separator && index < items.length - 1 && (
								<Separator className={'ml-4'} />
							)}
						</Fragment>
					))
				: children}
		</ItemGroup>
	);
};
