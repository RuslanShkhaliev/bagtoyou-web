import { Tables } from '@api/supabase/v1';
import { Category } from '@entities/category';

export type Ad = Tables<'ads'>;
export type CreateAd = {
	title: string;
	category_id: number;
	description: string;
	price: number;
	currency: string;
};
export type ListingPreview = {
	id: number;
	title: string;
	preview_image: string;
	is_favorite: boolean;
	price: number;
	currency: string;
	location: string;
	created_at: string;
};
export type ListingImage = Tables<'ad_images'>;
export interface AdModel {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	location: string;
	imageUrl: string;
	currency: string;
	is_favorite: boolean;
	images: string[];
	seller: {
		name: string;
		phone: string;
		email: string;
	};
	createdAt: string;
}
export enum ListingType {
	Offer,
	Request,
}

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
	[ListingType.Offer]: 'Предлагаю доставить',
	[ListingType.Request]: 'Ищу попутчика',
};

export enum ListingStatus {
	Draft = 'draft',
	Moderation = 'moderation',
	Active = 'active',
	Inactive = 'inactive',
	Closed = 'closed',
	Expired = 'expired',
	Rejected = 'rejected',
}

export const AD_STATUS_LABELS: Record<ListingStatus, string> = {
	[ListingStatus.Draft]: 'Черновик',
	[ListingStatus.Moderation]: 'На модерации',
	[ListingStatus.Active]: 'Активно',
	[ListingStatus.Inactive]: 'Архив',
	[ListingStatus.Closed]: 'Закрыто',
	[ListingStatus.Expired]: 'Истекло',
	[ListingStatus.Rejected]: 'Отклонено',
};

export const AD_STATUS_COLORS: Record<ListingStatus, string> = {
	[ListingStatus.Draft]: 'bg-gray-100 text-gray-700',
	[ListingStatus.Moderation]: 'bg-blue-100 text-blue-700',
	[ListingStatus.Active]: 'bg-green-100 text-green-700',
	[ListingStatus.Closed]: 'bg-gray-100 text-gray-700',
	[ListingStatus.Inactive]: 'bg-gray-100 text-gray-700',
	[ListingStatus.Expired]: 'bg-red-100 text-red-700',
	[ListingStatus.Rejected]: 'bg-red-100 text-red-700',
};
