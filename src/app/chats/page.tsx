import { ChatList } from '@views/chat/ui/ChatList';

export { ChatList as default } from '@views/chat/ui/ChatList';

export const ChatPage = () => {
	const newChat: Chat = {
		id: `chat-${Date.now()}`,
		listingId: listing.id,
		listingTitle: listing.title,
		listingImage: listing.imageUrl,
		otherUser: {
			id: listing.seller.name,
			name: listing.seller.name,
		},
		messages: [],
		unread: 0,
	};
	return <ChatList chats={} />;
};
