'use client';

import {LocationField} from '@/widgets/location-picker/ui/location-field';
import {ButtonClickEvent} from '@shared/types/events';
import {Card, CardContent, ReverseButton} from '@shared/ui';
import {Search} from 'lucide-react';
import {FC} from 'react';


interface LocationSelectorProps {
	selectFrom: () => void;
	selectTo: () => void;
	fromValue: string;
	toValue: string;
	error?: string;
	errorFrom?: string;
	errorTo?: string;
	onReverse?: () => void;
	onClearFrom?: () => void;
	onClearTo?: () => void;
}



export const LocationSelector: FC<LocationSelectorProps> = ({toValue, fromValue, selectFrom, selectTo, onReverse, onClearFrom, onClearTo}) => {
	const handleReverse = (e: ButtonClickEvent) => {
		e.stopPropagation();
        onReverse?.();
	}
	return (
		<Card className={'relative py-2'}>
			<CardContent className={'flex items-stretch px-2 gap-2'}>
				<div className={'flex flex-col justify-center'}>
					<Search size={20}/>
				</div>
				<div className="flex flex-col flex-1 items-center justify-center gap-3">
					<LocationField placeholder="From" value={fromValue} onClick={selectFrom} onClear={onClearFrom}/>
					<LocationField placeholder="To" value={toValue} onClick={selectTo} onClear={onClearTo}/>
					{onReverse && (
						<div className={'absolute z-10'}>
							<ReverseButton onClick={handleReverse}/>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
};



