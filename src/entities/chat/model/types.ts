export interface Message {
	id: string;
	text: string;
	senderId: string;
	timestamp: string;
	isRead: boolean;
}

export interface Chat {
	id: string;
	ad: {
		id: string;
		title: string;
		image: string;
	};
	otherUser: {
		id: string;
		name: string;
	};
	messages: Message[];
	lastMessage?: string;
	lastMessageTime?: string;
	unread: number;
}
