import { ButtonClickEvent } from '@shared/types/events';
import { Button } from '@shared/ui';
import { ArrowDownUp } from 'lucide-react';

export const ReverseButton = ({
	onClick,
}: {
	onClick: (e: ButtonClickEvent) => void;
}) => (
	<Button
		size={'icon'}
		onClick={onClick}
	>
		<ArrowDownUp size={18} />
	</Button>
);
