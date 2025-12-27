import { Category } from '@entities/category';
import { Badge, Button } from '@shared/ui';
import { FC, useState } from 'react';
import { ModalCategory } from 'src/features/ad-category-select/ui/ModalCategory';

interface CategorySelectProps {
	value: Category | null;
	onChange: (category: Category | null) => void;
}
export const SelectCategory: FC<CategorySelectProps> = ({
	value,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (category: Category | null) => {
		onChange(category);
		setIsOpen(false);
	};
	return (
		<div className={'flex gap-2'}>
			{value && (
				<Badge
					className={'min-w-[100px]'}
					variant={'secondary'}
				>
					{value.name}
				</Badge>
			)}
			<Button
				size={'sm'}
				type={'button'}
				onClick={handleToggleOpen}
			>
				Выбрать
			</Button>
			<ModalCategory
				value={value}
				open={isOpen}
				onSelect={handleSelect}
				onOpenChange={setIsOpen}
			/>
		</div>
	);
};
