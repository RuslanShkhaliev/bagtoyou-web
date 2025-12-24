import { useToggleFavorite } from '@features/add-favorite/api/useToggleFavorite';
import { cn } from '@lib/utils';
import { ButtonClickEvent } from '@shared/types/events';
import { Button } from '@shared/ui';
import { debounce } from '@utils/debounce';
import { Heart } from 'lucide-react';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
	ad_id: number;
	favorite: boolean;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
	favorite,
	ad_id,
}) => {
	const [isFavorite, setIsFavorite] = useState(favorite);
	const { mutate: toggleMutate } = useToggleFavorite();
	const toggleFavorite = debounce((e: ButtonClickEvent) => {
		e.stopPropagation();
		toggleMutate(ad_id, {
			onSuccess: () => {
				setIsFavorite(!isFavorite);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	}, 300);

	return (
		<Button
			variant='ghost'
			className={cn(isFavorite && 'text-red-500', 'h-6 w-6')}
			onClick={toggleFavorite}
		>
			<Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
		</Button>
	);
};
