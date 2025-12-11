import {cn} from '@lib/utils';
import {MapPin} from 'lucide-react';


interface LocationItemProps {
	city: string;
	country: string;
	onClick: () => void;
}

export const LocationItem = ({
	city,
	country,
	onClick
}: LocationItemProps) => {
	return (
		<button
			type="button"
			className={cn(
				'flex items-start gap-3 w-full px-4 py-3 text-left',
				'bg-background hover:bg-accent transition-colors',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
			)}
			onClick={onClick}
		>
			<MapPin className="size-5 text-muted-foreground shrink-0 mt-0.5" />
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-foreground truncate">
					{city}
				</p>
				<p className="text-xs text-muted-foreground truncate">
					{country}
				</p>
			</div>
		</button>
	);
};
