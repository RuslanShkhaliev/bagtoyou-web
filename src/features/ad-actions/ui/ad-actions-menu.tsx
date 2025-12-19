import * as React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Button,
} from '@shared/ui';
import {
	Edit,
	Trash2,
	XCircle,
	Heart,
	Share2,
	MoreVertical,
	MessageCircle,
} from 'lucide-react';
import { AdPermissions } from '@entities/ad/model/permissions';

interface AdActionsMenuProps {
	permissions: AdPermissions;
	onEdit?: () => void;
	onDelete?: () => void;
	onClose?: () => void;
	onRespond?: () => void;
	onAddToFavorites?: () => void;
	onShare?: () => void;
}

export const AdActionsMenu: React.FC<AdActionsMenuProps> = ({
	permissions,
	onEdit,
	onDelete,
	onClose,
	onRespond,
	onAddToFavorites,
	onShare,
}) => {
	const hasOwnerActions =
		permissions.canEdit || permissions.canDelete || permissions.canClose;
	const hasGuestActions =
		permissions.canRespond || permissions.canAddToFavorites;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
				>
					<MoreVertical className='h-5 w-5' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-48'
			>
				{/* Действия для владельца */}
				{permissions.canEdit && (
					<DropdownMenuItem onClick={onEdit}>
						<Edit className='mr-2 h-4 w-4' />
						Редактировать
					</DropdownMenuItem>
				)}

				{permissions.canClose && (
					<DropdownMenuItem onClick={onClose}>
						<XCircle className='mr-2 h-4 w-4' />
						Снять с публикации
					</DropdownMenuItem>
				)}

				{permissions.canDelete && (
					<>
						{hasOwnerActions && <DropdownMenuSeparator />}
						<DropdownMenuItem
							onClick={onDelete}
							className='text-destructive'
						>
							<Trash2 className='mr-2 h-4 w-4' />
							Удалить
						</DropdownMenuItem>
					</>
				)}

				{/* Действия для гостей */}
				{permissions.canRespond && (
					<>
						{hasOwnerActions && <DropdownMenuSeparator />}
						<DropdownMenuItem onClick={onRespond}>
							<MessageCircle className='mr-2 h-4 w-4' />
							Откликнуться
						</DropdownMenuItem>
					</>
				)}

				{permissions.canAddToFavorites && (
					<DropdownMenuItem onClick={onAddToFavorites}>
						<Heart className='mr-2 h-4 w-4' />В избранное
					</DropdownMenuItem>
				)}

				{/* Общие действия */}
				{permissions.canShare && (
					<>
						{(hasOwnerActions || hasGuestActions) && (
							<DropdownMenuSeparator />
						)}
						<DropdownMenuItem onClick={onShare}>
							<Share2 className='mr-2 h-4 w-4' />
							Поделиться
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
