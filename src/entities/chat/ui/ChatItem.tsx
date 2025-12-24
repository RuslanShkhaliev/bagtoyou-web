import { Chat } from '@entities/chat/model/types';
import { Avatar, AvatarFallback, Badge, Card } from '@shared/ui';

interface Props {
	data: Chat;
}
export const ChatItem = () => {
	return (
		<Card
			key={chat.id}
			className='p-4 cursor-pointer hover:shadow-md transition-shadow'
			onClick={() => onSelectChat(chat)}
		>
			<div className='flex gap-3'>
				<Avatar className='h-12 w-12'>
					<AvatarFallback>
						{chat.otherUser.name.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>

				<div className='flex-1 min-w-0'>
					<div className='flex items-start justify-between mb-1'>
						<p className='truncate'>{chat.otherUser.name}</p>
						{chat.lastMessageTime && (
							<span className='text-xs text-muted-foreground whitespace-nowrap ml-2'>
								{new Date(
									chat.lastMessageTime,
								).toLocaleDateString('ru-RU', {
									day: 'numeric',
									month: 'short',
								})}
							</span>
						)}
					</div>

					<p className='text-sm text-muted-foreground truncate mb-1'>
						{chat.listingTitle}
					</p>

					<div className='flex items-center justify-between'>
						<p className='text-sm text-muted-foreground truncate flex-1'>
							{chat.lastMessage || 'Нет сообщений'}
						</p>
						{chat.unread > 0 && (
							<Badge
								variant='default'
								className='ml-2'
							>
								{chat.unread}
							</Badge>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};
