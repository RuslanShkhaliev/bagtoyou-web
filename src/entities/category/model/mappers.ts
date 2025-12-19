import { Category, MappedCategory } from './types';

export const buildTree = (
	categories: Category[],
	parentId: null | number = null,
): MappedCategory[] => {
	return categories
		.filter((category) => category.parent_id === parentId)
		.toSorted((a, b) => a.order! - b.order!)
		.map((category) => ({
			...category,
			children: buildTree(categories, category.id),
		}));
};
