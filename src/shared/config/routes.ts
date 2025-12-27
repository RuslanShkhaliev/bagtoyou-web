export const appRoutes = {
	main: () => '/',
	listings: {
		root: () => '/listings',
		details: (id: number) => `/listings/${id}`,
		create: () => '/listings/create',
		edit: (id: number) => `/listings/${id}/edit`,
	},

	chats: {
		root: () => '/chats',
		details: (id: number) => `/chats/${id}`,
	},

	account: {
		root: () => '/account',
		settings: () => '/account/settings',
		ads: () => '/account/ads',
	},

	favorites: () => '/favorites',
	addListing: () => '/add',
	category: (id: number) => `/category/${id}`,
} as const;
