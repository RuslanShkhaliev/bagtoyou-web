type QueryParams = Record<string, string | number | boolean | undefined>;

export const buildUrl = (path: string, params?: QueryParams): string => {
	if (!params) return path;

	const query = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			query.append(key, String(value));
		}
	});

	const queryString = query.toString();
	return queryString ? `${path}?${queryString}` : path;
};
