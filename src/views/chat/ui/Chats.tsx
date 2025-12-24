'use client';
import { Chat } from '@entities/chat/model/types';
import { useState } from 'react';
import { ChatList } from './ChatList';

export const Chats = () => {
	const [chats, setChats] = useState([]);
	const handleSelectChat = (chat: Chat) => {};
	return (
		<div className='container mx-auto px-4 py-4 pb-24 md:pb-4'>
			<h2 className='mb-6'>Сообщения</h2>
			<ChatList
				chats={chats}
				onSelectChat={handleSelectChat}
			/>
		</div>
	);
};
