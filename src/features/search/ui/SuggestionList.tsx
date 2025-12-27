export const SuggestionList = () => {
	return (
		<ul
			style={{ top: `var(--search-bar-y-position)` }}
			className={
				'fixed top-9 bg-red-400 z-100 right-0 left-0 bottom-0 overflow-scroll'
			}
		/>
	);
};
