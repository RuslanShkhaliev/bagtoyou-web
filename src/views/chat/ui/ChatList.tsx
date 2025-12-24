import { Avatar, AvatarFallback, Badge, Card } from '@shared/ui';
import { MessageCircle } from 'lucide-react';
import type { Chat } from './ChatWindow';

interface ChatListProps {
	chats: Chat[];
	onSelectChat: (chat: Chat) => void;
}

export function ChatList({ chats, onSelectChat }: ChatListProps) {
	if (chats.length === 0) {
		return (
			<div className='text-center py-16'>
				<MessageCircle className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
				<h3 className='text-muted-foreground mb-2'>Нет сообщений</h3>
				<p className='text-muted-foreground'>
					Начните общение с продавцами через объявления
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-2'>
			{chats.map((chat) => (

			))}
		</div>
	);
}
