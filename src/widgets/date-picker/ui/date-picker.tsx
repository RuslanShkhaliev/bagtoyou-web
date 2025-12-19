'use client';

import {
	Button,
	Calendar,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@shared/ui';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { FC, useId, useState } from 'react';

interface DatePickerProps {
	label?: string;
	selected?: Date;
	placeholder?: string;
	onSelect?: (date: Date | undefined) => void;
}
export const DatePicker: FC<DatePickerProps> = ({
	label,
	onSelect,
	selected,
	placeholder,
}) => {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(selected);
	const compId = useId();

	const handleSelect = (date: Date | undefined) => {
		setDate(date);
		setOpen(false);
		onSelect?.(date);
	};

	return (
		<div className='flex flex-col gap-3'>
			{label && (
				<Label
					htmlFor={compId}
					className='px-1'
				>
					{label}
				</Label>
			)}
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						id={compId}
						className='w-48 justify-start font-normal'
					>
						<ChevronDownIcon />
						{date
							? date.toLocaleDateString()
							: placeholder || 'Select date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto overflow-hidden p-0'
					align='start'
				>
					<Calendar
						mode='single'
						selected={date}
						captionLayout='dropdown'
						onSelect={handleSelect}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};
