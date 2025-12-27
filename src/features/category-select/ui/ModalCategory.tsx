import { Category, CategoryItem, MappedCategory } from '@entities/category';
import { BottomSheet, ItemGroup, Spinner } from '@shared/ui';
import { ChevronLeft } from 'lucide-react';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useGetCategories } from '../api/useGetCategories';

type CategorySelectProps = PropsWithChildren<{
	open: boolean;
	value: Category | null;
	onOpenChange: (val: boolean) => void;
	onSelect: (data: Category) => void;
}>;

export const ModalCategory: FC<CategorySelectProps> = ({
	open,
	onOpenChange,
	value,
	onSelect,
}) => {
	const { data: categoryTree, isLoading } = useGetCategories();
	const [categories, setCategories] = useState<MappedCategory[]>([]);

	useEffect(() => {
		if (!categoryTree) return;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCategories(categoryTree);
	}, [categoryTree]);

	const history = useRef<MappedCategory[][]>([]);

	const handleClick = (category: MappedCategory) => {
		if (category.children && category.children.length > 0) {
			history.current.push(categories);
			setCategories(category.children as MappedCategory[]);
		} else {
			onSelect(category);
		}
	};

	const handleBack = () => {
		if (history.current.length > 0) {
			const prevCategories = history.current.pop();
			if (prevCategories) {
				setCategories(prevCategories);
			}
		} else {
			onOpenChange(false);
		}
	};

	return (
		<BottomSheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<div className='flex flex-col gap-6 h-full'>
				<div className='flex items-center gap-3'>
					<button
						className='cursor-pointer p-1 hover:bg-muted/40 rounded-sm'
						onClick={handleBack}
					>
						<ChevronLeft />
					</button>
					<h2 className='text-xl font-semibold'>
						Выберите категорию
					</h2>
				</div>

				{isLoading && <Spinner />}

				{!isLoading && (
					<div className='flex-1 overflow-y-auto'>
						<ItemGroup className='gap-3'>
							{categories.map((category) => (
								<CategoryItem
									key={category.id}
									onClick={handleClick}
									data={category}
								/>
							))}
						</ItemGroup>
					</div>
				)}
			</div>
		</BottomSheet>
	);
};
