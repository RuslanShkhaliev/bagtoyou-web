import { Chat } from '@entities/chat/model/types';
import { Avatar, AvatarFallback, Badge, Card } from '@shared/ui';
import { FC } from 'react';

interface ChatItemProps {
	data: Chat;
	onClick: (chat: Chat) => void;
}
export const ChatItem: FC<ChatItemProps> = ({ data, onClick }) => {
	return (
		<Card
			className='p-4 cursor-pointer hover:shadow-md transition-shadow'
			onClick={() => onClick(data)}
		>
			<div className='flex gap-3'>
				<Avatar className='h-12 w-12'>
					<AvatarFallback>
						{data.otherUser.name.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>

				<div className='flex-1 min-w-0'>
					<div className='flex items-start justify-between mb-1'>
						<p className='truncate'>{data.otherUser.name}</p>
						{data.lastMessageTime && (
							<span className='text-xs text-muted-foreground whitespace-nowrap ml-2'>
								{new Date(
									data.lastMessageTime,
								).toLocaleDateString('ru-RU', {
									day: 'numeric',
									month: 'short',
								})}
							</span>
						)}
					</div>

					<p className='text-sm text-muted-foreground truncate mb-1'>
						{data.ad.title}
					</p>

					<div className='flex items-center justify-between'>
						<p className='text-sm text-muted-foreground truncate flex-1'>
							{data.lastMessage || 'Нет сообщений'}
						</p>
						{data.unread > 0 && (
							<Badge
								variant='default'
								className='ml-2'
							>
								{data.unread}
							</Badge>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};
