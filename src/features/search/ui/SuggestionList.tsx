import { FC } from 'react';

interface SuggestionListProps {
	offsetY: number;
	suggestions?: string[];
}

export const SuggestionList: FC<SuggestionListProps> = ({ offsetY }) => {
	return (
		<ul
			style={{ top: `${offsetY + 1}px` }}
			className={
				'fixed top-9 bg-red-400 z-100 right-0 left-0 h-full bottom-0 overflow-scroll'
			}
		/>
	);
};
